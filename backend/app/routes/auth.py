from flask import Blueprint, jsonify, request
from firebase_admin import auth

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    token = request.json.get('token')
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        return jsonify({"message": "Login successful", "uid": uid})
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    return jsonify({"message": "Register endpoint"})
