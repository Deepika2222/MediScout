# Placeholder for AI Engine
# In a real scenario, this would load a trained model (e.g., pickle file)
# and provide predictions.

class AIEngine:
    def __init__(self):
        # Load model here
        pass

    def predict_medicine(self, symptoms):
        # Mock prediction logic
        # TODO: Replace with actual ML model prediction
        symptom_map = {
            "headache": ["Paracetamol", "Ibuprofen"],
            "fever": ["Paracetamol", "Dolo 650"],
            "cold": ["Cetirizine", "Sinarest"],
        }
        
        results = set()
        for symptom in symptoms:
            if symptom.lower() in symptom_map:
                results.update(symptom_map[symptom.lower()])
        
        return list(results) if results else ["Consult a Doctor"]
