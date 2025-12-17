"""Quick admin creation script"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.models.admin import Admin

try:
    admin = Admin.create(
        email="admin@portfolio.com",
        password="admin123",
        name="Venkatesh Gondu"
    )
    print("✅ Admin user created!")
    print("Email: admin@portfolio.com")
    print("Password: admin123")
except Exception as e:
    print(f"Note: {e}")
