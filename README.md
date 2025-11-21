# NeuroVision AI - Landing Page

A futuristic, medical-themed landing page for NeuroVision AI, a deep learning project that detects and visualizes brain tumors from MRI scans using PyTorch, MONAI, and Three.js.

## 🚀 Features

- **3D Brain Visualization**: Interactive rotating brain model using Three.js and React Three Fiber
- **Modern UI/UX**: Futuristic design with neon cyan accents, smooth animations, and particle effects
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Smooth Animations**: GSAP and Framer Motion animations for engaging user experience
- **Demo Section**: Placeholder for MRI upload and real-time visualization (backend integration pending)
- **Accessible**: Semantic HTML and ARIA labels for better accessibility

## 🎨 Design

- **Theme**: Futuristic, medical, intelligent
- **Colors**: 
  - Background: Deep navy (#0C0E12)
  - Accent: Neon cyan (#00FFFF)
  - Tumor highlight: Red-orange (#FF3B3F)
  - Text: Soft white (#F8F8F8)
- **Typography**: Orbitron (headings), Montserrat (subtitles), Roboto (body)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- A modern web browser

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧠 3D Brain Model

### Adding Your Brain Model

The landing page includes a placeholder 3D brain visualization. To use your own brain model:

1. **Place your 3D model file** in the `public/models/` directory:
   ```
   public/
     models/
       brain.glb  (or brain.obj, brain.fbx)
   ```

2. **Supported formats**:
   - `.glb` (GLTF Binary) - Recommended
   - `.obj` (Wavefront OBJ)
   - `.fbx` (Autodesk FBX)

3. **Update the model path** in `components/Brain3D.tsx` if needed:
   ```typescript
   brainModel = useGLTF('/models/brain.glb');
   ```

### Current Implementation

If no brain model is found, the component will automatically render a brain-like shape using spheres as a fallback. The model rotates slowly and includes:
- Two hemispheres (left and right)
- Example tumor highlight (red sphere)
- Cyan glowing material with emissive lighting

## 📁 Project Structure

```
neurovision-ai/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── Brain3D.tsx         # 3D brain visualization component
│   ├── DemoSection.tsx     # MRI upload and demo section
│   ├── FeaturesSection.tsx # Features showcase
│   ├── Footer.tsx          # Footer with social links
│   ├── HeroSection.tsx     # Hero section with CTA
│   ├── MissionSection.tsx  # Mission and vision
│   └── ParticleBackground.tsx # Animated particle background
├── public/
│   └── models/             # Place your 3D brain models here
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion, AOS (Animate On Scroll)
- **Fonts**: Google Fonts (Orbitron, Montserrat, Roboto)

## 🔧 Configuration

### Customizing Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'neuro-dark': '#0C0E12',
  'neuro-cyan': '#00FFFF',
  'neuro-red': '#FF3B3F',
  // Add your custom colors
}
```

### Adjusting Animations

- **Hero animations**: Edit `components/HeroSection.tsx`
- **Scroll animations**: Configure AOS in `app/page.tsx`
- **3D brain rotation**: Modify `components/Brain3D.tsx` useFrame hook

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Docker container
- Traditional Node.js hosting

## 🔮 Future Enhancements

- [ ] Backend API integration for MRI processing
- [ ] Real-time tumor detection and visualization
- [ ] User authentication and saved scans
- [ ] Advanced 3D controls (slice views, measurements)
- [ ] Export functionality (PDF reports, 3D models)
- [ ] Multi-language support
- [ ] Dark/light theme toggle

## 📝 Notes

- The demo section currently shows a placeholder for file upload. Backend integration is required for full functionality.
- The 3D brain model will use a fallback visualization if no model file is provided.
- All animations are optimized for performance and can be disabled for slower devices.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for medical AI innovation**

