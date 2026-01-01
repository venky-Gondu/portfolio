from flask import Blueprint, request, jsonify
from database.models.visitor import Visitor

visitor_bp = Blueprint('visitor', __name__)

@visitor_bp.route('/api/visitor/track', methods=['POST'])
def track_visitor():
    """Track visitor activity"""
    try:
        data = request.get_json(force=True, silent=True) or {}
        
        # Get visitor info
        ip_address = request.remote_addr
        user_agent = request.headers.get('User-Agent', '')
        page = data.get('page', '/')
        referrer = request.headers.get('Referer', data.get('referrer', ''))
        
        # Track visitor
        visitor = Visitor.track(
            ip_address=ip_address,
            user_agent=user_agent,
            page=page,
            referrer=referrer
        )
        
        return jsonify({
            'success': True,
            'message': 'Visitor tracked'
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to track visitor'
        }), 500

@visitor_bp.route('/api/visitor/stats', methods=['GET'])
def get_visitor_stats():
    """Get visitor statistics (public endpoint for demo)"""
    try:
        total_visits = Visitor.get_count()
        unique_visitors = Visitor.get_unique_visitors()
        
        return jsonify({
            'success': True,
            'stats': {
                'total_visits': total_visits,
                'unique_visitors': unique_visitors
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to fetch stats'
        }), 500
