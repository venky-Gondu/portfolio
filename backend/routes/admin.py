from flask import Blueprint, request, jsonify
from database.models.admin import Admin
from database.models.contact import Contact
from middleware.auth import token_required, generate_token

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/admin/login', methods=['POST'])
def login():
    """Admin login endpoint"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided. Ensure Content-Type is application/json'
            }), 400
            
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'error': 'Email and password are required'
            }), 400
        
        # Authenticate admin
        try:
            admin = Admin.authenticate(email, password)
        except Exception as auth_err:
            print(f"Auth error: {str(auth_err)}")
            return jsonify({
                'success': False,
                'error': f'Authentication error: {str(auth_err)}'
            }), 500
        
        if not admin:
            return jsonify({
                'success': False,
                'error': 'Invalid email or password'
            }), 401
        
        # Generate JWT token
        try:
            token = generate_token(admin['_id'], admin['email'])
            # Ensure token is string (PyJWT 2.x returns string, but let's be safe)
            if isinstance(token, bytes):
                token = token.decode('utf-8')
        except Exception as jwt_err:
            print(f"JWT error: {str(jwt_err)}")
            return jsonify({
                'success': False,
                'error': f'Token generation error: {str(jwt_err)}'
            }), 500
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'admin': {
                'id': admin['_id'],
                'email': admin['email'],
                'name': admin['name']
            }
        }), 200
        
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Login exception: {error_trace}")
        return jsonify({
            'success': False,
            'error': f'An unexpected error occurred: {str(e)}'
        }), 500

@admin_bp.route('/api/admin/contacts', methods=['GET'])
@token_required
def get_contacts():
    """Get all contact submissions (protected route)"""
    try:
        # Get pagination parameters
        limit = request.args.get('limit', 100, type=int)
        skip = request.args.get('skip', 0, type=int)
        
        contacts = Contact.get_all(limit=limit, skip=skip)
        total_count = Contact.get_count()
        unread_count = Contact.get_unread_count()
        
        return jsonify({
            'success': True,
            'contacts': contacts,
            'total': total_count,
            'unread': unread_count
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to fetch contacts'
        }), 500

@admin_bp.route('/api/admin/contacts/<contact_id>', methods=['DELETE'])
@token_required
def delete_contact(contact_id):
    """Delete a contact submission (protected route)"""
    try:
        success = Contact.delete(contact_id)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Contact deleted successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Contact not found'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to delete contact'
        }), 500

@admin_bp.route('/api/admin/contacts/<contact_id>/read', methods=['PATCH'])
@token_required
def mark_contact_read(contact_id):
    """Mark contact as read (protected route)"""
    try:
        success = Contact.mark_as_read(contact_id)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Contact marked as read'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Contact not found'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to update contact'
        }), 500

@admin_bp.route('/api/admin/verify', methods=['GET'])
@token_required
def verify_token():
    """Verify JWT token"""
    return jsonify({
        'success': True,
        'admin_id': request.admin_id,
        'email': request.admin_email
    }), 200
