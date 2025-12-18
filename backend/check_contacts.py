"""Check if contacts were saved"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.models.contact import Contact

print("Checking saved contacts...")
print("="*60)

try:
    contacts = Contact.get_all()
    print(f"Total contacts in database: {len(contacts)}")
    
    if contacts:
        print("\nContact submissions:")
        for i, contact in enumerate(contacts[:5], 1):
            print(f"{i}. {contact.get('name')} - {contact.get('email')}")
            print(f"   Message: {contact.get('message')[:50]}...")
    else:
        print("\nNo contacts found yet.")
        print("Try submitting the contact form again!")
        
except Exception as e:
    print(f"Error: {e}")

print("="*60)
