from flask import Blueprint, jsonify, request
from app.services.db import get_db

search_bp = Blueprint('search', __name__, url_prefix='/search-medicine')

@search_bp.route('/', methods=['GET'])
def search_medicine():
    query = request.args.get('q')
    db = get_db()
    # Simple regex search for demonstration
    medicines = list(db.medicines.find({"name": {"$regex": query, "$options": "i"}}, {"_id": 0}))
    return jsonify({"results": medicines, "query": query})
