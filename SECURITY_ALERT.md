# ⚠️ URGENT: Security Alert

## MongoDB Credentials Exposed

Your MongoDB credentials were accidentally exposed. **Immediate action required!**

### Critical Actions (Do This Now!)

#### 1. Change MongoDB Password

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Database Access"** (left sidebar)
3. Find your database user
4. Click **"Edit"** → **"Edit Password"**
5. Click **"Autogenerate Secure Password"**
6. **Copy the new password**
7. Click **"Update User"**

#### 2. Update Render Environment Variable

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Open your `portfolio-api` service
3. Click **"Environment"** tab
4. Update `MONGODB_URI` with the new password:
   ```
   mongodb+srv://YOUR_USERNAME:NEW_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0
   ```
5. Click **"Save Changes"** (Render will auto-redeploy)

#### 3. Update Local .env File

Update `backend/.env` with the new connection string (keep this file private!)

---

## Security Best Practices

✅ **Never commit credentials to Git**  
✅ **Use `.env` files (already gitignored)**  
✅ **Set secrets in hosting dashboards only**  
✅ **Enable 2FA on MongoDB Atlas**  
✅ **Rotate credentials regularly**

---

## Checklist

- [ ] Changed MongoDB password
- [ ] Updated Render environment variable
- [ ] Updated local `.env` file
- [ ] Verified backend still works
- [ ] Enabled 2FA on MongoDB Atlas (recommended)

---

**After completing these steps, your credentials will be secure!**
