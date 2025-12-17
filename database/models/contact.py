from datetime import datetime
from database.connection import get_db, db_connection
from database.config import Config
import re

class Contact:
    """Contact form submission model - works with both MongoDB and test DB"""
    
    @staticmethod
    def validate_email(email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_phone(phone):
        """Validate phone number (basic validation)"""
        cleaned = re.sub(r'[\s\-\(\)]', '', phone)
        return re.match(r'^\+?\d{10,15}$', cleaned) is not None
    
    @staticmethod
    def create(name, email, phone, message, ip_address=None, user_agent=None):
        """Create a new contact submission"""
        # Validation
        if not name or len(name.strip()) < 2:
            raise ValueError("Name must be at least 2 characters")
        
        if not Contact.validate_email(email):
            raise ValueError("Invalid email format")
        
        if phone and not Contact.validate_phone(phone):
            raise ValueError("Invalid phone number format")
        
        if not message or len(message.strip()) < 10:
            raise ValueError("Message must be at least 10 characters")
        
        # Create contact document
        contact_data = {
            'name': name.strip(),
            'email': email.strip().lower(),
            'phone': phone.strip() if phone else None,
            'message': message.strip(),
            'ip_address': ip_address,
            'user_agent': user_agent,
            'timestamp': datetime.utcnow(),
            'read': False
        }
        
        db = get_db()
        
        # Check if using test database
        if db_connection.is_test_db():
            contact_id = db.insert_contact(contact_data)
            contact_data['_id'] = contact_id
        else:
            result = db[Config.CONTACTS_COLLECTION].insert_one(contact_data)
            contact_data['_id'] = result.inserted_id
        
        return contact_data
    
    @staticmethod
    def get_all(limit=100, skip=0):
        """Get all contact submissions"""
        db = get_db()
        
        if db_connection.is_test_db():
            contacts = db.get_all_contacts()[skip:skip+limit]
        else:
            contacts = list(db[Config.CONTACTS_COLLECTION]
                           .find()
                           .sort('timestamp', -1)
                           .skip(skip)
                           .limit(limit))
        
        # Convert ObjectId to string for JSON serialization
        for contact in contacts:
            if '_id' in contact:
                contact['_id'] = str(contact['_id'])
            if 'timestamp' in contact and hasattr(contact['timestamp'], 'isoformat'):
                contact['timestamp'] = contact['timestamp'].isoformat()
        
        return contacts
    
    @staticmethod
    def delete(contact_id):
        """Delete a contact submission"""
        db = get_db()
        
        if db_connection.is_test_db():
            return db.delete_contact(contact_id)
        else:
            from bson.objectid import ObjectId
            result = db[Config.CONTACTS_COLLECTION].delete_one({'_id': ObjectId(contact_id)})
            return result.deleted_count > 0
    
    @staticmethod
    def get_count():
        """Get total count of contacts"""
        db = get_db()
        
        if db_connection.is_test_db():
            return len(db.contacts)
        else:
            return db[Config.CONTACTS_COLLECTION].count_documents({})
    
    @staticmethod
    def get_unread_count():
        """Get count of unread contacts"""
        db = get_db()
        
        if db_connection.is_test_db():
            return sum(1 for c in db.contacts if not c.get('read', False))
        else:
            return db[Config.CONTACTS_COLLECTION].count_documents({'read': False})
