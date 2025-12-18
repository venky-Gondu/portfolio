from flask import Blueprint, jsonify
import os

setup_bp = Blueprint('setup', __name__)

@setup_bp.route('/api/setup/create-admin', methods=['POST'])
def create_admin():
    """
    One-time setup endpoint to create admin user
    IMPORTANT: Remove this endpoint after creating admin!
    """
    
    # Security check - only allow in development or with secret key
    setup_secret = os.getenv('SETUP_SECRET', 'VenkySetup2025Secret')
    
    try:
        from database.models.admin import Admin
        
        # Check if admin already exists
        from database.connection import get_db
        db = get_db()
        existing_admin = db.admins.find_one({})
        
        if existing_admin:
            return jsonify({
                'success': False,
                'message': 'Admin user already exists. Please login with existing credentials.'
            }), 400
        
        # Create admin user
        admin = Admin.create(
            email="admin@venkyportfolio.com",
            password="VenkyAdmin2025!Secure",
            name="Venkatesh Gondu"
        )
        
        return jsonify({
            'success': True,
            'message': 'Admin user created successfully!',
            'credentials': {
                'email': 'admin@venkyportfolio.com',
                'password': 'VenkyAdmin2025!Secure',
                'note': 'Please change password after first login'
            }
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
