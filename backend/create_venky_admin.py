"""Create Venkatesh's admin account"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.models.admin import Admin

print("Creating Venkatesh's admin account...")

try:
    admin = Admin.create(
        email="venkatesh.gondu@portfolio.com",
        password="Venky@2025!Admin",
        name="Venkatesh Gondu"
    )
    print("\n" + "="*60)
    print("✅ ADMIN ACCOUNT CREATED SUCCESSFULLY!")
    print("="*60)
    print("\nLogin at: http://localhost:3000/admin/login")
    print("\n📧 Email:    venkatesh.gondu@portfolio.com")
    print("🔑 Password: Venky@2025!Admin")
    print("\n" + "="*60)
    
except ValueError as e:
    if "already exists" in str(e):
        print("\n" + "="*60)
        print("ℹ️  ADMIN ALREADY EXISTS - USE THESE CREDENTIALS:")
        print("="*60)
        print("\nLogin at: http://localhost:3000/admin/login")
        print("\n📧 Email:    venkatesh.gondu@portfolio.com")
        print("🔑 Password: Venky@2025!Admin")
        print("\n" + "="*60)
    else:
        print(f"\n❌ Error: {e}")
except Exception as e:
    print(f"\n❌ Unexpected error: {e}")
