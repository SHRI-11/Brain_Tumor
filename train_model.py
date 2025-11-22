"""
Training script for NeuroVision AI brain tumor classifier.

This script builds and trains an EfficientNet-B0 model using MONAI/PyTorch on the
Kaggle brain tumor dataset. It handles data preparation, training/validation
splits, logging, checkpointing, and curve plotting.
"""

from __future__ import annotations

import argparse
import os
import random
from dataclasses import dataclass
from typing import Dict, List, Sequence, Tuple

import matplotlib.pyplot as plt
import numpy as np
import torch
from PIL import Image
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader, Dataset
from tqdm.auto import tqdm

from monai.networks.nets import EfficientNetBN
from monai.transforms import (
    Compose,
    EnsureChannelFirst,
    EnsureType,
    NormalizeIntensity,
    RandFlip,
    RandGaussianNoise,
    RandRotate,
    RandZoom,
    Resize,
)

# Global constants -----------------------------------------------------------------
CLASS_NAMES: List[str] = ["glioma", "meningioma", "pituitary", "no_tumor"]
CLASS_NAME_TO_IDX: Dict[str, int] = {name: idx for idx, name in enumerate(CLASS_NAMES)}
CLASS_ALIASES: Dict[str, str] = {
    "glioma": "glioma",
    "glioma_tumor": "glioma",
    "meningioma": "meningioma",
    "pituitary": "pituitary",
    "pituitary_tumor": "pituitary",
    "no_tumor": "no_tumor",
    "no-tumor": "no_tumor",
    "no tumor": "no_tumor",
    "notumor": "no_tumor",
}


# Utility dataclasses --------------------------------------------------------------
@dataclass
class TrainingSamples:
    train: List[Tuple[str, int]]
    val: List[Tuple[str, int]]


# Dataset + transforms -------------------------------------------------------------
class BrainTumorDataset(Dataset):
    """Simple dataset that loads JPG/PNG images with Pillow and applies MONAI transforms."""

    def __init__(self, samples: Sequence[Tuple[str, int]], transform: Compose) -> None:
        self.samples = list(samples)
        self.transform = transform

    def __len__(self) -> int:
        return len(self.samples)

    def __getitem__(self, idx: int):
        image_path, label = self.samples[idx]
        image = Image.open(image_path)
        # Convert grayscale to RGB before transforms
        if image.mode != "RGB":
            image = image.convert("RGB")
        np_image = np.array(image)
        image.close()
        transformed = self.transform(np_image)
        return transformed, torch.tensor(label, dtype=torch.long)


def get_transforms(train: bool) -> Compose:
    """Create MONAI transforms for training or validation."""
    base_transforms = [
        EnsureChannelFirst(channel_dim=-1),
        Resize(spatial_size=(224, 224)),
    ]

    augmentations: List = []
    if train:
        augmentations = [
            RandRotate(range_x=np.deg2rad(15), prob=0.5, keep_size=True),
            RandFlip(prob=0.5, spatial_axis=1),  # flip along height (H) dimension
            RandZoom(prob=0.3, min_zoom=0.9, max_zoom=1.1, keep_size=True),
            RandGaussianNoise(prob=0.2, mean=0.0, std=0.05),
        ]

    normalization = [
        NormalizeIntensity(nonzero=True, channel_wise=True),
        EnsureType(dtype=torch.float32),
    ]

    return Compose(base_transforms + augmentations + normalization)


# Data helpers ---------------------------------------------------------------------
def set_random_seeds(seed: int) -> None:
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)


def resolve_dataset_root(dataset_root: str) -> str:
    """Resolve dataset directory, falling back to capitalized variant if needed."""
    if os.path.isdir(dataset_root):
        return dataset_root
    alt = dataset_root.capitalize()
    if os.path.isdir(alt):
        return alt
    raise FileNotFoundError(
        f"Could not find dataset directory at '{dataset_root}' or '{alt}'."
    )


def collect_image_samples(dataset_root: str) -> List[Tuple[str, int]]:
    """Collect (image_path, label_idx) tuples from dataset/Training/* directories."""
    training_dir = os.path.join(dataset_root, "Training")
    if not os.path.isdir(training_dir):
        raise FileNotFoundError(f"Missing Training directory under {dataset_root}")

    samples: List[Tuple[str, int]] = []
    for class_dir in sorted(os.listdir(training_dir)):
        full_path = os.path.join(training_dir, class_dir)
        if not os.path.isdir(full_path):
            continue
        normalized_name = CLASS_ALIASES.get(class_dir.lower())
        if normalized_name is None:
            print(f"[WARN] Skipping unrecognized class folder: {class_dir}")
            continue
        label_idx = CLASS_NAME_TO_IDX[normalized_name]
        for filename in os.listdir(full_path):
            if filename.lower().endswith((".jpg", ".jpeg", ".png")):
                samples.append((os.path.join(full_path, filename), label_idx))
    if not samples:
        raise RuntimeError(f"No training images found in {training_dir}")
    return samples


def split_samples(
    samples: List[Tuple[str, int]],
    val_split: float,
    seed: int,
) -> TrainingSamples:
    """Split samples into train/validation subsets with stratification."""
    labels = [label for _, label in samples]
    train, val = train_test_split(
        samples,
        test_size=val_split,
        stratify=labels,
        random_state=seed,
        shuffle=True,
    )
    return TrainingSamples(train=train, val=val)


# Model + training utilities -------------------------------------------------------
def build_model(num_classes: int) -> EfficientNetBN:
    """Instantiate EfficientNet-B0 classifier."""
    model = EfficientNetBN(
        model_name="efficientnet-b0",
        spatial_dims=2,
        in_channels=3,
        num_classes=num_classes,
    )
    return model


def run_epoch(
    model: torch.nn.Module,
    loader: DataLoader,
    criterion: torch.nn.Module,
    optimizer: torch.optim.Optimizer | None,
    device: torch.device,
    desc: str,
) -> Tuple[float, float]:
    """Run a single training or validation epoch."""
    is_train = optimizer is not None
    model.train(is_train)

    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in tqdm(loader, desc=desc, leave=False):
        images, labels = images.to(device), labels.to(device)

        if is_train:
            optimizer.zero_grad()

        outputs = model(images)
        loss = criterion(outputs, labels)

        if is_train:
            loss.backward()
            optimizer.step()

        running_loss += loss.item() * images.size(0)
        preds = torch.argmax(outputs, dim=1)
        correct += (preds == labels).sum().item()
        total += labels.size(0)

    epoch_loss = running_loss / total
    epoch_acc = correct / total

    return epoch_loss, epoch_acc


def ensure_directories() -> Tuple[str, str]:
    """Ensure models/ and results/ directories exist and return their paths."""
    models_dir = os.path.join("models")
    results_dir = os.path.join("results")
    os.makedirs(models_dir, exist_ok=True)
    os.makedirs(results_dir, exist_ok=True)
    return models_dir, results_dir


def plot_curves(
    epochs: Sequence[int],
    train_values: Sequence[float],
    val_values: Sequence[float],
    ylabel: str,
    output_path: str,
) -> None:
    plt.figure(figsize=(8, 5))
    plt.plot(epochs, train_values, label=f"Train {ylabel}")
    plt.plot(epochs, val_values, label=f"Val {ylabel}")
    plt.xlabel("Epoch")
    plt.ylabel(ylabel)
    plt.title(f"{ylabel} over Time")
    plt.grid(True, linestyle="--", alpha=0.4)
    plt.legend()
    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()


# Main entrypoint ------------------------------------------------------------------
def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Train EfficientNet-B0 brain tumor classifier (PyTorch + MONAI)."
    )
    parser.add_argument(
        "--dataset-root",
        default="dataset",
        help="Path to dataset root containing Training/ and Testing/ folders.",
    )
    parser.add_argument("--epochs", type=int, default=20, help="Number of epochs.")
    parser.add_argument("--batch-size", type=int, default=16, help="Batch size.")
    parser.add_argument("--lr", type=float, default=1e-4, help="Learning rate.")
    parser.add_argument("--val-split", type=float, default=0.2, help="Validation split.")
    parser.add_argument(
        "--num-workers", type=int, default=4, help="DataLoader worker processes."
    )
    parser.add_argument("--seed", type=int, default=42, help="Random seed.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    set_random_seeds(args.seed)
    dataset_root = resolve_dataset_root(args.dataset_root)

    models_dir, results_dir = ensure_directories()
    model_path = os.path.join(models_dir, "brain_tumor_classifier.pth")

    print(f"[INFO] Using dataset at: {dataset_root}")
    samples = collect_image_samples(dataset_root)
    splits = split_samples(samples, args.val_split, args.seed)
    print(
        f"[INFO] Loaded {len(samples)} images — "
        f"{len(splits.train)} train / {len(splits.val)} val (stratified)."
    )

    train_dataset = BrainTumorDataset(
        splits.train, transform=get_transforms(train=True)
    )
    val_dataset = BrainTumorDataset(
        splits.val, transform=get_transforms(train=False)
    )

    train_loader = DataLoader(
        train_dataset,
        batch_size=args.batch_size,
        shuffle=True,
        num_workers=args.num_workers,
        pin_memory=True,
    )
    val_loader = DataLoader(
        val_dataset,
        batch_size=args.batch_size,
        shuffle=False,
        num_workers=args.num_workers,
        pin_memory=True,
    )

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[INFO] Training on device: {device}")

    model = build_model(num_classes=len(CLASS_NAMES)).to(device)
    criterion = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=args.lr)

    history = {
        "train_loss": [],
        "val_loss": [],
        "train_acc": [],
        "val_acc": [],
    }

    best_val_acc = 0.0
    best_state = None

    epochs_range = range(1, args.epochs + 1)
    for epoch in epochs_range:
        print(f"\n===== Epoch {epoch}/{args.epochs} =====")
        train_loss, train_acc = run_epoch(
            model,
            train_loader,
            criterion,
            optimizer,
            device,
            desc=f"Epoch {epoch} [Train]",
        )
        val_loss, val_acc = run_epoch(
            model,
            val_loader,
            criterion,
            optimizer=None,
            device=device,
            desc=f"Epoch {epoch} [Val]",
        )

        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)
        history["train_acc"].append(train_acc)
        history["val_acc"].append(val_acc)

        print(
            f"[METRICS] Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f} | "
            f"Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.4f}"
        )

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            best_state = model.state_dict()
            torch.save(
                {
                    "model_state_dict": best_state,
                    "class_names": CLASS_NAMES,
                    "input_size": (3, 224, 224),
                    "best_val_acc": best_val_acc,
                    "epochs_trained": epoch,
                    "args": vars(args),
                },
                model_path,
            )
            print(f"[CHECKPOINT] Saved new best model -> {model_path}")

    print(f"\n[RESULT] Best validation accuracy: {best_val_acc:.4f}")

    # Plot curves
    loss_curve_path = os.path.join(results_dir, "loss_curve.png")
    acc_curve_path = os.path.join(results_dir, "accuracy_curve.png")
    plot_curves(epochs_range, history["train_loss"], history["val_loss"], "Loss", loss_curve_path)
    plot_curves(
        epochs_range, history["train_acc"], history["val_acc"], "Accuracy", acc_curve_path
    )
    print(f"[PLOTS] Saved loss curve to {loss_curve_path}")
    print(f"[PLOTS] Saved accuracy curve to {acc_curve_path}")


if __name__ == "__main__":
    main()

