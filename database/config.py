import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Database configuration"""
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'portfolio_db')
    
    # Collections
    CONTACTS_COLLECTION = 'contacts'
    ADMINS_COLLECTION = 'admins'
    VISITORS_COLLECTION = 'visitors'
