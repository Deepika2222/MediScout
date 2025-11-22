from flask import Blueprint, jsonify, request, current_app
import google.generativeai as genai
import os

symptom_bp = Blueprint('symptom', __name__, url_prefix='/symptom-suggest')

@symptom_bp.route('/', methods=['POST'])
def suggest_medicine():
    data = request.json
    symptoms = data.get('symptoms', [])
    symptom_text = ", ".join(symptoms)
    
    api_key = current_app.config.get('GEMINI_API_KEY')
    
    if not api_key:
        return jsonify({"suggestions": [
            {"medicine": "Error", "usage": "API Key Missing", "warning": "Please configure GEMINI_API_KEY", "details": "Backend configuration error."}
        ]})

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        Act as a pharmacist. A patient has the following symptoms: {symptom_text}.
        Suggest 2-3 common OTC medicines.
        Format the output as a JSON list of objects with keys: 'medicine', 'usage', 'warning', 'details'.
        Do not include markdown formatting like ```json. Just return the raw JSON string.
        """
        
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Clean up potential markdown code blocks if Gemini adds them
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
            
        import json
        suggestions = json.loads(text)
        
        return jsonify({"suggestions": suggestions})
        
    except Exception as e:
        print(f"Gemini Error: {e}")
        # Fallback
        return jsonify({"suggestions": [
            {"medicine": "Consult Doctor", "usage": "N/A", "warning": "AI Service Unavailable", "details": str(e)}
        ]})
