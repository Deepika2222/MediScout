from flask import Blueprint, jsonify, request

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    # TODO: Implement Firebase token verification
    return jsonify({"message": "Login endpoint"})

@auth_bp.route('/register', methods=['POST'])
def register():
    return jsonify({"message": "Register endpoint"})
