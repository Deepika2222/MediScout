from flask import Blueprint, jsonify, request

search_bp = Blueprint('search', __name__, url_prefix='/search-medicine')

@search_bp.route('/', methods=['GET'])
def search_medicine():
    query = request.args.get('q', '').lower()
    
    # Enhanced Mock Data with External Links
    mock_results = [
        {
            "name": f"{query.capitalize()} 500mg",
            "pharmacy": "Apollo Pharmacy",
            "price": 20, # INR
            "available": True,
            "address": "MG Road, Bangalore",
            "lat": 12.9716,
            "lon": 77.5946,
            "link": f"https://www.apollopharmacy.in/search-medicines/{query}"
        },
        {
            "name": f"{query.capitalize()} 650mg",
            "pharmacy": "Tata 1mg",
            "price": 30,
            "available": True,
            "address": "Online",
            "lat": 12.9784,
            "lon": 77.6408,
            "link": f"https://www.1mg.com/search/all?name={query}"
        },
        {
            "name": f"{query.capitalize()} Syrup",
            "pharmacy": "Pharmeasy",
            "price": 120,
            "available": True,
            "address": "Online",
            "lat": 12.9352,
            "lon": 77.6245,
            "link": f"https://pharmeasy.in/search/all?name={query}"
        },
        {
            "name": f"{query.capitalize()} Tablet",
            "pharmacy": "MedPlus",
            "price": 18,
            "available": True,
            "address": "Koramangala, Bangalore",
            "lat": 12.9345,
            "lon": 77.6101,
            "link": f"https://www.medplusmart.com/search?q={query}"
        },
        {
            "name": f"{query.capitalize()} 650mg",
            "pharmacy": "Netmeds",
            "price": 25,
            "available": True,
            "address": "Online",
            "lat": 12.9719,
            "lon": 77.5937,
            "link": f"https://www.netmeds.com/catalogsearch/result?q={query}"
        },
        {
            "name": f"{query.capitalize()} Capsule",
            "pharmacy": "Wellness Forever",
            "price": 45,
            "available": True,
            "address": "Indiranagar, Bangalore",
            "lat": 12.9698,
            "lon": 77.6366,
            "link": f"https://wellnessforever.com/search?q={query}"
        },
        {
            "name": f"{query.capitalize()} 250mg",
            "pharmacy": "Frank Ross Pharmacy",
            "price": 15,
            "available": True,
            "address": "Kolkata (Online)",
            "lat": 22.5726,
            "lon": 88.3639,
            "link": f"https://frankrosspharmacy.com/search?q={query}"
        }
    ]
    
    return jsonify({"results": mock_results, "query": query})
