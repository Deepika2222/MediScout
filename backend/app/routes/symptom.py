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
        
        # Rule-based Fallback
        symptom_lower = symptom_text.lower()
        fallback_suggestions = []
        
        if 'fever' in symptom_lower or 'temp' in symptom_lower:
            fallback_suggestions.append({
                "medicine": "Paracetamol (Dolo 650)",
                "usage": "1 tablet every 6 hours after food.",
                "warning": "Do not exceed 4g per day.",
                "details": "Common antipyretic for fever reduction."
            })
        
        if 'headache' in symptom_lower or 'pain' in symptom_lower:
            fallback_suggestions.append({
                "medicine": "Ibuprofen (Brufen 400)",
                "usage": "1 tablet with food when needed.",
                "warning": "Avoid if you have acidity or ulcers.",
                "details": "NSAID for pain relief and inflammation."
            })
            
        if 'cold' in symptom_lower or 'runny nose' in symptom_lower:
            fallback_suggestions.append({
                "medicine": "Cetirizine (Cetzine)",
                "usage": "1 tablet at night.",
                "warning": "May cause drowsiness. Avoid driving.",
                "details": "Antihistamine for allergy and cold symptoms."
            })
            
        if 'cough' in symptom_lower:
            fallback_suggestions.append({
                "medicine": "Dextromethorphan Syrup",
                "usage": "10ml every 8 hours.",
                "warning": "May cause dizziness.",
                "details": "Cough suppressant for dry cough."
            })
            
        if not fallback_suggestions:
            fallback_suggestions.append({
                "medicine": "Consult Doctor",
                "usage": "N/A",
                "warning": "Symptoms not recognized.",
                "details": "Please visit a nearby clinic for proper diagnosis."
            })
            
        return jsonify({"suggestions": fallback_suggestions})
