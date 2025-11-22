"""
Inference script for NeuroVision AI brain tumor classifier.

Usage:
    python predict.py --image path/to/image.jpg
"""

from __future__ import annotations

import argparse
import os
from typing import List

import numpy as np
import torch
from PIL import Image

from monai.networks.nets import EfficientNetBN
from monai.transforms import Compose, EnsureChannelFirst, EnsureType, NormalizeIntensity, Resize

DEFAULT_CLASS_NAMES: List[str] = ["glioma", "meningioma", "pituitary", "no_tumor"]


def build_model(num_classes: int) -> EfficientNetBN:
    return EfficientNetBN(
        model_name="efficientnet-b0",
        spatial_dims=2,
        in_channels=3,
        num_classes=num_classes,
    )


def get_inference_transforms() -> Compose:
    return Compose(
        [
            EnsureChannelFirst(channel_dim=-1),
            Resize(spatial_size=(224, 224)),
            NormalizeIntensity(nonzero=True, channel_wise=True),
            EnsureType(dtype=torch.float32),
        ]
    )


def load_image(image_path: str) -> np.ndarray:
    # Try both relative and absolute paths
    if not os.path.isfile(image_path):
        # Try with capitalized Dataset folder
        alt_path = image_path.replace("dataset/", "Dataset/").replace("dataset\\", "Dataset\\")
        if os.path.isfile(alt_path):
            image_path = alt_path
        else:
            raise FileNotFoundError(
                f"Image not found: {image_path}\n"
                f"Tried: {image_path}\n"
                f"Also tried: {alt_path}\n"
                "Please check the file path and ensure the image exists."
            )
    image = Image.open(image_path)
    # Convert grayscale to RGB to match training pipeline
    if image.mode != "RGB":
        image = image.convert("RGB")
    np_image = np.array(image)
    image.close()
    return np_image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run inference with the trained brain tumor classifier."
    )
    parser.add_argument(
        "--image",
        required=True,
        help="Path to an input image (JPG/PNG).",
    )
    parser.add_argument(
        "--model-path",
        default=os.path.join("models", "brain_tumor_classifier.pth"),
        help="Path to the saved model checkpoint (.pth).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    if not os.path.isfile(args.model_path):
        raise FileNotFoundError(
            f"Model checkpoint not found at {args.model_path}. "
            "Train the model first with train_model.py."
        )

    checkpoint = torch.load(args.model_path, map_location=device, weights_only=False)
    class_names = checkpoint.get("class_names", DEFAULT_CLASS_NAMES)
    model = build_model(num_classes=len(class_names))
    model.load_state_dict(checkpoint["model_state_dict"])
    model.to(device)
    model.eval()

    transforms = get_inference_transforms()
    image_np = load_image(args.image)
    tensor = transforms(image_np).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = model(tensor)
        probabilities = torch.softmax(logits, dim=1)
        confidence, pred_idx = torch.max(probabilities, dim=1)

    pred_idx = pred_idx.item()
    confidence = confidence.item() * 100
    logits_list = logits.squeeze(0).cpu().tolist()
    probs_list = probabilities.squeeze(0).cpu().tolist()

    predicted_class = class_names[pred_idx]
    print(f"Predicted Class: {predicted_class}")
    print(f"Confidence: {confidence:.2f}%")
    print(f"Raw Logits: {logits_list}")
    print(f"Softmax Probabilities: {probs_list}")


if __name__ == "__main__":
    main()

