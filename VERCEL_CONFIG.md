# Vercel Deployment Configuration

## ⚠️ Important: Root Directory Setting

When deploying to Vercel, you **MUST** configure the Root Directory setting because your Next.js app is in the `frontend/` subdirectory.

### During Vercel Setup:

1. **Import your GitHub repository**
2. **Configure Project Settings:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` ← **CRITICAL!**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL` = Your Render backend URL

### Why This is Needed

Your project structure:
```
Interview/
├── frontend/          ← Next.js app is HERE
│   ├── package.json
│   ├── next.config.js
│   └── ...
├── backend/           ← Flask API
└── vercel.json
```

Vercel needs to know to look in the `frontend/` directory for the Next.js app.

### Screenshot Guide

When you see the "Configure Project" screen on Vercel:

1. Click **"Edit"** next to "Root Directory"
2. Select `frontend` from the dropdown
3. Verify other settings are correct
4. Click **"Deploy"**

That's it! Vercel will now find your `package.json` and build successfully.
