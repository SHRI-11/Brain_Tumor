# 3D Brain Models Directory

Place your 3D brain model files in this directory.

## Supported Formats

- **.glb** (GLTF Binary) - Recommended, most efficient
- **.obj** (Wavefront OBJ)
- **.fbx** (Autodesk FBX)

## Recommended File

- `brain.glb` - The component will automatically load this file if present

## Model Requirements

- **File size**: Keep models under 10MB for optimal loading
- **Complexity**: Models with 50k-200k triangles work well
- **Textures**: Embedded textures in .glb format are supported
- **Materials**: PBR materials work best for realistic rendering

## Where to Find Models

- [Sketchfab](https://sketchfab.com) - Search for "brain" or "human brain"
- [TurboSquid](https://www.turbosquid.com) - Professional 3D models
- [Poly Haven](https://polyhaven.com) - Free, high-quality models
- Medical imaging software - Export from DICOM to 3D format

## Notes

- If no model is found, the application will automatically render a placeholder brain shape
- The model should be centered at the origin (0, 0, 0)
- Recommended scale: 1 unit = 1 meter (will be scaled automatically in the component)

