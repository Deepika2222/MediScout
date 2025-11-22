from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.services.firebase_service import init_firebase
from config import Config
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app) # Enable CORS for all routes
    
    from app.services.db import init_db
    init_db(app)
    
    init_firebase()
    
    # Register Blueprints
    from app.routes.main import main_bp
    from app.routes.auth import auth_bp
    from app.routes.search import search_bp
    from app.routes.symptom import symptom_bp
    from app.routes.ocr import ocr_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(symptom_bp)
    app.register_blueprint(ocr_bp)
    
    return app
