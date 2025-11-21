# Quick Start Guide - NeuroVision AI Landing Page

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Three.js, and animation libraries.

### Step 2: Run the Development Server

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Step 3: (Optional) Add Your 3D Brain Model

1. Get a brain model file (`.glb` format recommended)
2. Place it in `public/models/brain.glb`
3. Edit `components/Brain3D.tsx`:
   - Uncomment the `useGLTF` line in `BrainModelGLTF`
   - Uncomment the return statement for the GLTF model
   - Update `BrainModel()` to use the GLTF component

## 📁 Key Files

- `app/page.tsx` - Main landing page
- `components/HeroSection.tsx` - Hero section with 3D brain
- `components/Brain3D.tsx` - 3D brain visualization
- `app/globals.css` - Global styles and animations
- `tailwind.config.js` - Theme colors and customization

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'neuro-dark': '#0C0E12',    // Background
  'neuro-cyan': '#00FFFF',    // Accent
  'neuro-red': '#FF3B3F',     // Tumor highlight
  // ... add your colors
}
```

### Modify Content

- **Hero text**: `components/HeroSection.tsx`
- **Features**: `components/FeaturesSection.tsx`
- **Mission**: `components/MissionSection.tsx`
- **Footer**: `components/Footer.tsx`

## 🔧 Build for Production

```bash
npm run build
npm start
```

## 📦 Deploy

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Deploy automatically

### Deploy to Other Platforms

The project works with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Docker
- Traditional Node.js hosting

## 🆘 Troubleshooting

### Port Already in Use

If port 3000 is taken, Next.js will automatically use the next available port.

### 3D Model Not Loading

- Check file path: `/public/models/brain.glb`
- Verify file format (`.glb` recommended)
- Check browser console for errors
- Make sure the file size is reasonable (< 10MB)

### Styles Not Applied

- Run `npm install` to ensure Tailwind is installed
- Check that `tailwind.config.js` is in the root
- Restart the dev server

## 📚 Next Steps

- [ ] Add your brain model
- [ ] Customize colors and content
- [ ] Connect backend API for MRI processing
- [ ] Add user authentication
- [ ] Deploy to production

For more details, see the main [README.md](README.md).

