import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
backend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend')
env_path = os.path.join(backend_dir, '.env')
load_dotenv(dotenv_path=env_path)

class Config:
    """Database configuration"""
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'portfolio_db')
    
    # Collection names
    CONTACTS_COLLECTION = 'contacts'
    ADMINS_COLLECTION = 'admins'
    VISITORS_COLLECTION = 'visitors'
