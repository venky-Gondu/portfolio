"""Detailed MongoDB connection test"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import Config
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

print("="*60)
print("MongoDB Connection Test")
print("="*60)

# Check environment variable
print(f"\nMONGODB_URI from config: {Config.MONGODB_URI[:50]}...")
print(f"USE_TEST_DB: {os.getenv('USE_TEST_DB', 'not set')}")

# Try direct connection
print("\nAttempting direct MongoDB connection...")
try:
    client = MongoClient(
        Config.MONGODB_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000
    )
    
    # Test connection
    client.admin.command('ping')
    print("SUCCESS: Connected to MongoDB Atlas!")
    
    # Get database info
    db = client[Config.DATABASE_NAME]
    collections = db.list_collection_names()
    print(f"Database: {Config.DATABASE_NAME}")
    print(f"Collections: {collections if collections else 'None yet'}")
    
except ConnectionFailure as e:
    print(f"FAILED: Connection refused - {e}")
    print("\nPossible issues:")
    print("1. Network access not whitelisted (0.0.0.0/0)")
    print("2. Username or password incorrect")
    print("3. Cluster is paused or deleted")
    
except ServerSelectionTimeoutError as e:
    print(f"FAILED: Timeout - {e}")
    print("\nPossible issues:")
    print("1. Connection string format incorrect")
    print("2. Cluster address wrong")
    print("3. Network/firewall blocking connection")
    
except Exception as e:
    print(f"FAILED: {type(e).__name__} - {e}")

print("="*60)
