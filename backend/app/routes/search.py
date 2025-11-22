from flask import Blueprint, jsonify, request

search_bp = Blueprint('search', __name__, url_prefix='/search-medicine')

@search_bp.route('/', methods=['GET'])
def search_medicine():
    query = request.args.get('q')
    # TODO: Implement search logic
    return jsonify({"results": [], "query": query})
