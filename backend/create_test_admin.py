"""Create admin credentials for testing"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.models.admin import Admin

print("Creating admin user...")

try:
    admin = Admin.create(
        email="admin@test.com",
        password="admin123",
        name="Admin User"
    )
    print("\n" + "="*50)
    print("ADMIN CREDENTIALS CREATED SUCCESSFULLY!")
    print("="*50)
    print("\nLogin at: http://localhost:3000/admin/login")
    print("\nEmail:    admin@test.com")
    print("Password: admin123")
    print("\n" + "="*50)
    
except ValueError as e:
    if "already exists" in str(e):
        print("\n" + "="*50)
        print("ADMIN ALREADY EXISTS - USE THESE CREDENTIALS:")
        print("="*50)
        print("\nLogin at: http://localhost:3000/admin/login")
        print("\nEmail:    admin@test.com")
        print("Password: admin123")
        print("\n" + "="*50)
    else:
        print(f"\nError: {e}")
except Exception as e:
    print(f"\nUnexpected error: {e}")
