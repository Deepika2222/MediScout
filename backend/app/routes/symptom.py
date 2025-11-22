from flask import Blueprint, jsonify, request
from app.services.ai_engine import AIEngine

symptom_bp = Blueprint('symptom', __name__, url_prefix='/symptom-suggest')
ai_engine = AIEngine()

@symptom_bp.route('/', methods=['POST'])
def suggest_medicine():
    data = request.json
    symptoms = data.get('symptoms', [])
    suggestions = ai_engine.predict_medicine(symptoms)
    return jsonify({"suggestions": suggestions})
