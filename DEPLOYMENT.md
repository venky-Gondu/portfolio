# Vercel + Render Deployment Guide

This guide explains how to deploy your portfolio with **frontend on Vercel** and **backend on Render**.

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │────────▶│    Vercel    │────────▶│   Render    │
│             │         │  (Frontend)  │         │  (Backend)  │
└─────────────┘         └──────────────┘         └─────────────┘
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │   MongoDB   │
                                                  │    Atlas    │
                                                  └─────────────┘
```

- **Vercel**: Hosts Next.js frontend
- **Render**: Hosts Flask API backend
- **MongoDB Atlas**: Database

---

## 📋 Prerequisites

1. **GitHub Account** - Code repository
2. **Vercel Account** - [vercel.com](https://vercel.com)
3. **Render Account** - [render.com](https://render.com)
4. **MongoDB Atlas** - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## Part 1: Set Up MongoDB Atlas

### 1. Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free M0 cluster
3. Choose cloud provider and region

### 2. Create Database User
1. Go to "Database Access"
2. Add new user with password authentication
3. **Save credentials** (you'll need them!)

### 3. Whitelist IP Addresses
1. Go to "Network Access"
2. Add IP: `0.0.0.0/0` (allow from anywhere)

### 4. Get Connection String
1. Click "Connect" → "Connect your application"
2. Copy connection string
3. Replace `<password>` with your password
4. Example: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/`

---

## Part 2: Deploy Backend to Render

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Configure for separate deployments"
git push origin main
```

### Step 2: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `portfolio-api`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./backend/Dockerfile`
   - **Docker Context**: `./`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Plan**: `Free`

### Step 3: Set Environment Variables

Add these in Render dashboard:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `DATABASE_NAME` | `portfolio_db` |
| `JWT_SECRET_KEY` | Generate a random secure string |
| `FLASK_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | Leave empty for now (add after Vercel deployment) |

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for build
3. **Copy your backend URL** (e.g., `https://portfolio-api.onrender.com`)

### Step 5: Test Backend

Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### Step 2: Configure Project

Vercel should auto-detect Next.js. Verify:

- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (leave as root)
- **Build Command**: Auto-detected
- **Output Directory**: Auto-detected

### Step 3: Set Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL (e.g., `https://portfolio-api.onrender.com`) |

**Important**: Add this to all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. **Copy your Vercel URL** (e.g., `https://yourname.vercel.app`)

### Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Add environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://yourname.vercel.app`)
3. Click **"Save Changes"**
4. Render will redeploy automatically

---

## Part 4: Create Admin User

### Option 1: Using Render Shell

1. Go to Render service → **"Shell"** tab
2. Run:

```bash
python
```

Then:

```python
from database.models.admin import Admin

Admin.create(
    email="your-email@example.com",
    password="your-secure-password",
    name="Your Name"
)

print("Admin created!")
exit()
```

### Option 2: Using Local Script

1. Update local `backend/.env` with production MongoDB URI
2. Run:

```bash
cd backend
python create_admin.py
```

3. Revert `.env` to local settings

---

## ✅ Verification Checklist

### Backend (Render)
- [ ] `/health` endpoint returns healthy status
- [ ] `/` shows API info
- [ ] CORS allows requests from Vercel domain

### Frontend (Vercel)
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin dashboard shows contacts

### Integration
- [ ] Contact form data appears in admin dashboard
- [ ] No CORS errors in browser console
- [ ] API calls work from frontend

---

## 🔄 Updating Your Deployment

### Update Frontend

```bash
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel auto-deploys on push!

### Update Backend

```bash
# Make changes to backend code
git add .
git commit -m "Update backend"
git push origin main
```

Render auto-deploys on push!

---

## 🌐 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render
1. Go to Service Settings → Custom Domain
2. Add API subdomain (e.g., `api.yourdomain.com`)
3. Update DNS records

**Don't forget** to update `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` after adding custom domains!

---

## 🐛 Troubleshooting

### CORS Errors

**Error**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution**:
1. Verify `FRONTEND_URL` is set correctly in Render
2. Check Vercel URL matches exactly (with https://)
3. Redeploy backend after changing CORS settings

### API Calls Fail

**Error**: "Failed to fetch" or network errors

**Solution**:
1. Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
2. Verify backend is running (check Render logs)
3. Test backend health endpoint directly

### Database Connection Issues

**Error**: "Database disconnected"

**Solution**:
1. Verify MongoDB Atlas connection string
2. Check IP whitelist includes `0.0.0.0/0`
3. Ensure database user has correct permissions

### Slow Backend Response

**Issue**: First request takes 30+ seconds

**Cause**: Render free tier spins down after inactivity

**Solutions**:
- Upgrade to paid tier ($7/month)
- Use UptimeRobot to ping every 5 minutes
- Accept the cold start delay

---

## 💰 Cost Summary

| Service | Free Tier | Paid Option |
|---------|-----------|-------------|
| **Vercel** | Unlimited | $20/month (Pro) |
| **Render** | 750 hrs/month | $7/month (always-on) |
| **MongoDB Atlas** | 512 MB storage | $9/month (2GB) |
| **Total** | **$0/month** | ~$16-36/month |

---

## 🎉 Success!

Your portfolio is now live with:
- ✅ Fast frontend on Vercel's global CDN
- ✅ Reliable backend API on Render
- ✅ Secure database on MongoDB Atlas
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates

**Frontend**: `https://yourname.vercel.app`  
**Backend**: `https://portfolio-api.onrender.com`
