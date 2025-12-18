from flask import Flask, jsonify, send_from_directory, send_file
from flask_cors import CORS
import sys
import os

# Add parent directory to path for local development
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import routes - works both locally (backend.routes) and in Docker (routes)
try:
    from backend.routes.contact import contact_bp
    from backend.routes.admin import admin_bp
    from backend.routes.visitor import visitor_bp
    from backend.routes.setup import setup_bp
except ModuleNotFoundError:
    # Running in Docker where files are in /app directly
    from routes.contact import contact_bp
    from routes.admin import admin_bp
    from routes.visitor import visitor_bp
    from routes.setup import setup_bp

from database.connection import db_connection
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app (no static folder needed for API-only deployment)
app = Flask(__name__)

# CORS configuration - allow requests from Vercel frontend
frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
CORS(app, resources={
    r"/api/*": {
        "origins": [frontend_url, "http://localhost:3000", "https://*.vercel.app"],
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Register blueprints
app.register_blueprint(contact_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(visitor_bp)
app.register_blueprint(setup_bp)  # One-time setup route

# API root endpoint
@app.route('/')
def api_info():
    """API information endpoint"""
    return jsonify({
        'message': 'Portfolio API',
        'version': '1.0',
        'endpoints': {
            'health': '/health',
            'contact': '/api/contact',
            'admin_login': '/api/admin/login',
            'admin_contacts': '/api/admin/contacts',
            'visitor_track': '/api/visitor/track',
            'visitor_stats': '/api/visitor/stats'
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
