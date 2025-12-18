# Create Admin User on Render

## Your Backend is Live! 🎉

Now you need to create an admin user to access the admin dashboard.

---

## Step-by-Step Instructions

### 1. Go to Render Dashboard

Visit: https://dashboard.render.com

### 2. Open Your Service

Click on your `portfolio-api` service

### 3. Open Shell Tab

Click on the **"Shell"** tab (top navigation)

### 4. Run This Command

Copy and paste this **entire block** into the Render shell:

```python
from database.models.admin import Admin

admin = Admin.create(
    email="admin@venkyportfolio.com",
    password="VenkyAdmin2025!Secure",
    name="Venkatesh Gondu"
)

print("✅ Admin created!")
print(f"Email: admin@venkyportfolio.com")
print(f"Password: VenkyAdmin2025!Secure")
```

Press **Enter** and wait for the success message.

---

## Your Admin Credentials

**Email**: `admin@venkyportfolio.com`  
**Password**: `VenkyAdmin2025!Secure`

> **Important**: Change these credentials after first login for security!

---

## Login to Admin Dashboard

1. Go to your frontend: https://portfolio-56fn.vercel.app
2. Navigate to: https://portfolio-56fn.vercel.app/admin/login
3. Enter the credentials above
4. You should see the admin dashboard with contact submissions

---

## Alternative: Custom Credentials

If you want different credentials, modify the script:

```python
from database.models.admin import Admin

admin = Admin.create(
    email="YOUR_EMAIL@example.com",
    password="YOUR_SECURE_PASSWORD",
    name="Your Name"
)

print("✅ Admin created!")
```

---

## Troubleshooting

### "Admin already exists" error

If you see this error, the admin user already exists. You can either:

1. **Use existing credentials** (if you remember them)
2. **Delete and recreate** (run this in Render shell):

```python
from database.connection import get_db

db = get_db()
db.admins.delete_many({})  # Delete all admins
print("All admins deleted")

# Then run the create script again
```

### Can't access admin dashboard

1. Check backend is running: `https://your-backend.onrender.com/health`
2. Check frontend environment variable `NEXT_PUBLIC_API_URL` is set correctly
3. Check browser console for errors (F12)

---

## Security Reminder

⚠️ **After creating the admin user:**
1. Login to the admin dashboard
2. Change your password to something more secure
3. Never commit credentials to Git
4. Use strong, unique passwords

---

## What's Next?

After creating the admin user, you can:
- ✅ Login to admin dashboard
- ✅ View contact form submissions
- ✅ Delete old submissions
- ✅ Mark submissions as read
- ✅ Monitor visitor statistics
