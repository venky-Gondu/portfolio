from flask import Blueprint, request, jsonify
from database.models.contact import Contact

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/api/contact', methods=['POST'])
def submit_contact():
    """Submit contact form"""
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', '')
        message = data.get('message')
        
        # Get visitor info
        ip_address = request.remote_addr
        user_agent = request.headers.get('User-Agent', '')
        
        # Validate and create contact
        contact = Contact.create(
            name=name,
            email=email,
            phone=phone,
            message=message,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        return jsonify({
            'success': True,
            'message': 'Thank you for contacting me! I will get back to you soon.',
            'contact_id': str(contact['_id'])
        }), 201
        
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'An error occurred while processing your request'
        }), 500

@contact_bp.route('/api/contact/test', methods=['GET'])
def test_contact():
    """Test endpoint"""
    return jsonify({
        'success': True,
        'message': 'Contact API is working'
    }), 200
