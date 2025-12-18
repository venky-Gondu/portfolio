from flask import Flask, jsonify, send_from_directory, send_file
from flask_cors import CORS
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.routes.contact import contact_bp
from backend.routes.admin import admin_bp
from backend.routes.visitor import visitor_bp
from database.connection import db_connection
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app with static folder for Next.js
app = Flask(__name__, 
            static_folder='frontend/.next/static',
            static_url_path='/_next/static')

# CORS configuration - simplified for same-origin deployment
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # Allow all origins since frontend is served from same domain
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Register blueprints
app.register_blueprint(contact_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(visitor_bp)

# Serve Next.js frontend
@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    """Serve Next.js static export for all non-API routes"""
    # Check if it's an API route or health check
    if path.startswith('api/') or path == 'health':
        return jsonify({
            'success': False,
            'error': 'Endpoint not found'
        }), 404
    
    # Serve static files from public directory (Next.js export output)
    public_path = os.path.join(os.path.dirname(__file__), 'public')
    
    # If no path, serve index.html
    if not path:
        index_file = os.path.join(public_path, 'index.html')
        if os.path.exists(index_file):
            return send_file(index_file)
    
    # Try to serve the requested file
    file_path = os.path.join(public_path, path)
    if os.path.exists(file_path):
        if os.path.isfile(file_path):
            return send_file(file_path)
    
    # For Next.js routes, try to serve the HTML file
    html_path = os.path.join(public_path, path + '.html')
    if os.path.exists(html_path):
        return send_file(html_path)
    
    # Try path/index.html for directory routes
    index_path = os.path.join(public_path, path, 'index.html')
    if os.path.exists(index_path):
        return send_file(index_path)
    
    # Fallback: return API info if frontend not built
    return jsonify({
        'message': 'Portfolio Application',
        'note': 'Frontend not found. Build Next.js first.',
        'api_endpoints': {
            'health': '/health',
            'contact': '/api/contact',
            'admin_login': '/api/admin/login',
            'visitor_track': '/api/visitor/track'
        }
    })

# Health check endpoint
@app.route('/health')
def health():
    try:
        # Test database connection
        db = db_connection.get_database()
        return jsonify({
            'status': 'healthy',
            'database': 'connected'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

# Initialize database connection on startup
@app.before_request
def before_request():
    """Ensure database connection before each request"""
    try:
        db_connection.get_database()
    except Exception as e:
        pass  # Connection will be retried

# Close database connection on shutdown
@app.teardown_appcontext
def shutdown_session(exception=None):
    """Close database connection on app shutdown"""
    pass  # Connection pool handles this

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    
    print(f"Starting Flask server on port {port}...")
    print(f"Debug mode: {debug}")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
