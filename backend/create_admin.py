"""
Script to create an admin user for the portfolio website
Run this before starting the application
"""

from database.models.admin import Admin
from database.connection import get_db

def create_admin():
    print("=== Create Admin User ===\n")
    
    email = input("Enter admin email: ")
    password = input("Enter admin password: ")
    name = input("Enter admin name: ")
    
    try:
        # Create admin user
        admin = Admin.create(
            email=email,
            password=password,
            name=name
        )
        
        print(f"\n✅ Admin user created successfully!")
        print(f"Email: {email}")
        print(f"Name: {name}")
        print(f"\nYou can now login at: http://localhost:3000/admin/login")
        
    except ValueError as e:
        print(f"\n❌ Error: {e}")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")

if __name__ == "__main__":
    create_admin()
