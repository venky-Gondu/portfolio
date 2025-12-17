from datetime import datetime
import bcrypt
from database.connection import get_db, db_connection
from database.config import Config

class Admin:
    """Admin user model - works with both MongoDB and test DB"""
    
    @staticmethod
    def hash_password(password):
        """Hash password using bcrypt"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt)
    
    @staticmethod
    def verify_password(password, hashed_password):
        """Verify password against hash"""
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode('utf-8')
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password)
    
    @staticmethod
    def create(email, password, name):
        """Create a new admin user"""
        db = get_db()
        
        # Check if admin already exists
        existing = Admin.get_by_email(email)
        if existing:
            raise ValueError("Admin with this email already exists")
        
        admin_data = {
            'email': email.lower(),
            'password': Admin.hash_password(password).decode('utf-8'),  # Store as string
            'name': name,
            'created_at': datetime.utcnow(),
            'last_login': None
        }
        
        if db_connection.is_test_db():
            admin_id = db.insert_admin(admin_data)
            admin_data['_id'] = admin_id
        else:
            result = db[Config.ADMINS_COLLECTION].insert_one(admin_data)
            admin_data['_id'] = result.inserted_id
        
        return admin_data
    
    @staticmethod
    def authenticate(email, password):
        """Authenticate admin user"""
        admin = Admin.get_by_email(email)
        
        if not admin:
            # Try to get admin with password included
            db = get_db()
            if db_connection.is_test_db():
                admin_with_pwd = db.find_admin_by_email(email)
            else:
                admin_with_pwd = db[Config.ADMINS_COLLECTION].find_one({'email': email.lower()})
            
            if not admin_with_pwd:
                return None
            
            admin = admin_with_pwd
        else:
            # Get admin with password
            db = get_db()
            if db_connection.is_test_db():
                admin = db.find_admin_by_email(email)
            else:
                admin = db[Config.ADMINS_COLLECTION].find_one({'email': email.lower()})
        
        if not admin:
            return None
        
        stored_password = admin.get('password')
        if not stored_password:
            return None
            
        if isinstance(stored_password, str):
            stored_password = stored_password.encode('utf-8')
            
        try:
            if Admin.verify_password(password, stored_password):
                # Remove password from returned data
                admin_copy = admin.copy()
                admin_copy.pop('password', None)
                admin_copy['_id'] = str(admin_copy['_id'])
                return admin_copy
        except Exception as e:
            print(f"Password verification error: {e}")
            return None
        
        return None
    
    @staticmethod
    def get_by_email(email):
        """Get admin by email"""
        db = get_db()
        
        if db_connection.is_test_db():
            admin = db.find_admin_by_email(email)
        else:
            admin = db[Config.ADMINS_COLLECTION].find_one({'email': email.lower()})
        
        if admin:
            admin_copy = admin.copy()
            admin_copy.pop('password', None)
            admin_copy['_id'] = str(admin_copy['_id'])
            return admin_copy
        
        return None
