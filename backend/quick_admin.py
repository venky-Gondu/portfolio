"""
Quick admin creation script for Render Shell
Copy and paste this entire script into Render Shell
"""

from database.models.admin import Admin

# Create admin user
admin = Admin.create(
    email="admin@venkyportfolio.com",
    password="VenkyAdmin2025!Secure",
    name="Venkatesh Gondu"
)

print("✅ Admin user created successfully!")
print(f"Email: admin@venkyportfolio.com")
print(f"Password: VenkyAdmin2025!Secure")
print(f"\nLogin at: https://portfolio-56fn.vercel.app/admin/login")
