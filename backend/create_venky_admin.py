"""Create admin credentials for Venkatesh - Non-interactive version"""
import sys
import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
backend_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(backend_dir, '.env')
load_dotenv(dotenv_path=env_path)

print(f"Loading .env from: {env_path}")
print(f"MONGODB_URI: {os.getenv('MONGODB_URI', 'NOT FOUND')[:50]}...")

# Add parent directory to path
sys.path.insert(0, os.path.dirname(backend_dir))

from database.models.admin import Admin

print("Creating admin user for Venkatesh Gondu...")
print("Email: venkatesh.gondu@portfolio.com")

try:
    admin = Admin.create(
        email="venkatesh.gondu@portfolio.com",
        password="Venky@2025!Admin",
        name="Venkatesh Gondu"
    )
    print("\n" + "="*50)
    print("ADMIN CREDENTIALS CREATED SUCCESSFULLY!")
    print("="*50)
    print("\nLogin at: http://localhost:3000/admin/login")
    print("\nEmail:    venkatesh.gondu@portfolio.com")
    print("Password: Venky@2025!Admin")
    print("\n" + "="*50)
    
except ValueError as e:
    if "already exists" in str(e):
        print("\n" + "="*50)
        print("ADMIN ALREADY EXISTS - USE THESE CREDENTIALS:")
        print("="*50)
        print("\nLogin at: http://localhost:3000/admin/login")
        print("\nEmail:    venkatesh.gondu@portfolio.com")
        print("Password: Venky@2025!Admin")
        print("\n" + "="*50)
    else:
        print(f"\nError: {e}")
except Exception as e:
    print(f"\nUnexpected error: {e}")
    import traceback
    traceback.print_exc()
