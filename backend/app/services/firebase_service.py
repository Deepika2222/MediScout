import firebase_admin
from firebase_admin import credentials, firestore
import os

def init_firebase():
    # Check if already initialized to avoid errors on reloads
    if not firebase_admin._apps:
        # TODO: Use actual credentials path from env
        cred_path = os.environ.get('FIREBASE_CREDENTIALS')
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        else:
            print("Warning: Firebase Credentials not found. Firebase features will not work.")
            # Initialize with default for development if needed, or handle error
            # firebase_admin.initialize_app() 

def get_firestore():
    return firestore.client()
