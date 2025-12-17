"""
In-memory database for testing without MongoDB
Uses Python dictionaries to simulate database collections
"""

from datetime import datetime
from typing import Dict, List, Optional
import json
import os

class InMemoryDB:
    """Simple in-memory database for testing"""
    
    def __init__(self):
        self.contacts: List[Dict] = []
        self.admins: List[Dict] = []
        self.visitors: List[Dict] = []
        self._contact_id_counter = 1
        self._admin_id_counter = 1
        self._visitor_id_counter = 1
        
        # Try to load from file if exists
        self._load_from_file()
    
    def _load_from_file(self):
        """Load data from JSON file if it exists"""
        db_file = 'test_database.json'
        if os.path.exists(db_file):
            try:
                with open(db_file, 'r') as f:
                    data = json.load(f)
                    self.contacts = data.get('contacts', [])
                    self.admins = data.get('admins', [])
                    self.visitors = data.get('visitors', [])
                    self._contact_id_counter = data.get('contact_counter', 1)
                    self._admin_id_counter = data.get('admin_counter', 1)
                    self._visitor_id_counter = data.get('visitor_counter', 1)
            except Exception as e:
                print(f"Could not load database file: {e}")
    
    def _save_to_file(self):
        """Save data to JSON file"""
        db_file = 'test_database.json'
        try:
            data = {
                'contacts': self.contacts,
                'admins': self.admins,
                'visitors': self.visitors,
                'contact_counter': self._contact_id_counter,
                'admin_counter': self._admin_id_counter,
                'visitor_counter': self._visitor_id_counter
            }
            with open(db_file, 'w') as f:
                json.dump(data, f, indent=2, default=str)
        except Exception as e:
            print(f"Could not save database file: {e}")
    
    def insert_contact(self, contact_data: Dict) -> str:
        """Insert a contact"""
        contact_id = f"contact_{self._contact_id_counter}"
        self._contact_id_counter += 1
        
        contact_data['_id'] = contact_id
        contact_data['timestamp'] = contact_data.get('timestamp', datetime.utcnow().isoformat())
        self.contacts.append(contact_data)
        self._save_to_file()
        return contact_id
    
    def get_all_contacts(self) -> List[Dict]:
        """Get all contacts"""
        return sorted(self.contacts, key=lambda x: x.get('timestamp', ''), reverse=True)
    
    def delete_contact(self, contact_id: str) -> bool:
        """Delete a contact"""
        initial_len = len(self.contacts)
        self.contacts = [c for c in self.contacts if c['_id'] != contact_id]
        if len(self.contacts) < initial_len:
            self._save_to_file()
            return True
        return False
    
    def insert_admin(self, admin_data: Dict) -> str:
        """Insert an admin"""
        admin_id = f"admin_{self._admin_id_counter}"
        self._admin_id_counter += 1
        
        admin_data['_id'] = admin_id
        self.admins.append(admin_data)
        self._save_to_file()
        return admin_id
    
    def find_admin_by_email(self, email: str) -> Optional[Dict]:
        """Find admin by email"""
        for admin in self.admins:
            if admin.get('email', '').lower() == email.lower():
                return admin
        return None
    
    def insert_visitor(self, visitor_data: Dict) -> str:
        """Insert a visitor"""
        visitor_id = f"visitor_{self._visitor_id_counter}"
        self._visitor_id_counter += 1
        
        visitor_data['_id'] = visitor_id
        visitor_data['timestamp'] = visitor_data.get('timestamp', datetime.utcnow().isoformat())
        self.visitors.append(visitor_data)
        self._save_to_file()
        return visitor_id
    
    def get_visitor_count(self) -> int:
        """Get total visitor count"""
        return len(self.visitors)
    
    def get_unique_visitors(self) -> int:
        """Get unique visitor count by IP"""
        unique_ips = set(v.get('ip_address') for v in self.visitors if v.get('ip_address'))
        return len(unique_ips)

# Global instance
_db_instance = None

def get_test_db():
    """Get the test database instance"""
    global _db_instance
    if _db_instance is None:
        _db_instance = InMemoryDB()
    return _db_instance
