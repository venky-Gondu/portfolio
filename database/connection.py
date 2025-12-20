"""
Modified connection to use test database when MongoDB is not available
"""

import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from database.config import Config
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Check if we should use test database (default: false for production)
USE_TEST_DB = os.getenv('USE_TEST_DB', 'false').lower() == 'true'

class DatabaseConnection:
    """MongoDB connection manager with test database fallback"""
    _instance = None
    _client = None
    _db = None
    _use_test = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
        return cls._instance
    
    def connect(self):
        """Establish connection to MongoDB or use test database"""
        if self._db is not None:
            return self._db
            
        # Try MongoDB first if not forced to use test DB
        if not USE_TEST_DB:
            try:
                self._client = MongoClient(
                    Config.MONGODB_URI,
                    serverSelectionTimeoutMS=30000,
                    connectTimeoutMS=30000,
                    socketTimeoutMS=30000
                )
                # Test connection
                self._client.admin.command('ping')
                self._db = self._client[Config.DATABASE_NAME]
                logger.info(f"✅ Connected to MongoDB: {Config.DATABASE_NAME}")
                return self._db
            except (ConnectionFailure, ServerSelectionTimeoutError) as e:
                logger.warning(f"⚠️  MongoDB not available: {e}")
                logger.info("📦 Switching to test database (in-memory)")
        
        # Use test database
        from database.test_db import get_test_db
        self._db = get_test_db()
        self._use_test = True
        logger.info("✅ Using test database (file-based storage)")
        return self._db
    
    def get_database(self):
        """Get database instance"""
        if self._db is None:
            return self.connect()
        return self._db
    
    def is_test_db(self):
        """Check if using test database"""
        return self._use_test
    
    def close(self):
        """Close MongoDB connection"""
        if self._client:
            self._client.close()
            self._client = None
            self._db = None
            logger.info("MongoDB connection closed")

# Global database instance
db_connection = DatabaseConnection()

def get_db():
    """Helper function to get database instance"""
    return db_connection.get_database()
