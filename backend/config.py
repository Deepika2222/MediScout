import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///mediscout.db'
    # GOOGLE_MAPS_API_KEY removed as per request (Using Leaflet)
    FIREBASE_CREDENTIALS = os.environ.get('FIREBASE_CREDENTIALS')
    # Using hardcoded key for demo purposes as per user input, or env var
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY') or 'AIzaSyBLnx9L5UACh6wSP1opiSVVBSDEyChfHIQ'
