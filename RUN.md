# Steps to Run NeuroVision AI Landing Page

## Prerequisites
- Node.js 18 or higher installed
- npm or yarn package manager

## Step-by-Step Instructions

### Step 1: Open Terminal/Command Prompt
Open your terminal (PowerShell, Command Prompt, or Terminal) in the project directory:
```
C:\Users\shriv\Projects\Brain Tumor
```

### Step 2: Install Dependencies
Run this command to install all required packages:
```bash
npm install
```

**Expected output:** You'll see packages being downloaded and installed. This may take 1-2 minutes.

### Step 3: Start the Development Server
Run this command to start the Next.js development server:
```bash
npm run dev
```

**Expected output:** You should see something like:
```
> neurovision-ai@1.0.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

### Step 4: Open in Browser
Open your web browser and navigate to:
```
http://localhost:3000
```

The landing page should now be visible!

## What You Should See

- **Hero Section**: Animated 3D brain model with "AI-Powered Brain Tumor Detection" headline
- **Features Section**: Three feature cards (AI Diagnosis, 3D Visualization, Insights)
- **Demo Section**: Upload area for MRI scans
- **Mission Section**: Mission statement with stats
- **Footer**: Copyright and social links

## Troubleshooting

### Port 3000 Already in Use
If you see an error about port 3000 being in use:
- Next.js will automatically try the next available port (3001, 3002, etc.)
- Check the terminal output for the actual port number
- Or stop the process using port 3000

### Module Not Found Errors
If you see module errors:
```bash
# Delete node_modules and package-lock.json, then reinstall
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Build Errors
If you encounter TypeScript or build errors:
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

On Windows PowerShell:
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

## Stopping the Server

To stop the development server:
- Press `Ctrl + C` in the terminal
- Confirm with `Y` if prompted

## Next Steps

1. **Customize Content**: Edit files in the `components/` folder
2. **Add 3D Model**: Place `brain.glb` in `public/models/` and update `Brain3D.tsx`
3. **Change Colors**: Edit `tailwind.config.js`
4. **Deploy**: Run `npm run build` then deploy to Vercel, Netlify, etc.

## Quick Commands Reference

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check for code errors
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `QUICKSTART.md` for quick customization guide
- Check browser console (F12) for any errors

