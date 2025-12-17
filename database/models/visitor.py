from datetime import datetime
from database.connection import get_db, db_connection
from database.config import Config

class Visitor:
    """Visitor tracking model - works with both MongoDB and test DB"""
    
    @staticmethod
    def track(ip_address, user_agent, page=None, referrer=None):
        """Track a visitor"""
        visitor_data = {
            'ip_address': ip_address,
            'user_agent': user_agent,
            'page': page or '/',
            'referrer': referrer,
            'timestamp': datetime.utcnow()
        }
        
        db = get_db()
        
        if db_connection.is_test_db():
            visitor_id = db.insert_visitor(visitor_data)
            visitor_data['_id'] = visitor_id
        else:
            result = db[Config.VISITORS_COLLECTION].insert_one(visitor_data)
            visitor_data['_id'] = result.inserted_id
        
        return visitor_data
    
    @staticmethod
    def get_count():
        """Get total visitor count"""
        db = get_db()
        
        if db_connection.is_test_db():
            return db.get_visitor_count()
        else:
            return db[Config.VISITORS_COLLECTION].count_documents({})
    
    @staticmethod
    def get_unique_visitors():
        """Get count of unique IP addresses"""
        db = get_db()
        
        if db_connection.is_test_db():
            return db.get_unique_visitors()
        else:
            return len(db[Config.VISITORS_COLLECTION].distinct('ip_address'))
