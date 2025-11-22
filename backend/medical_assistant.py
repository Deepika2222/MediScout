import google.generativeai as genai
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum
from config import Config

# Configure Gemini API
try:
    genai.configure(api_key=Config.GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    print(f"Error initializing Gemini API: {e}")
    model = None

class AgeGroup(Enum):
    INFANT = "0-2 years"
    CHILD = "3-12 years"
    TEEN = "13-19 years"
    ADULT = "20-64 years"
    SENIOR = "65+ years"

@dataclass
class Medicine:
    name: str
    description: str
    age_restriction: str = ""
    common_forms: List[str] = None
    
    def __post_init__(self):
        if self.common_forms is None:
            self.common_forms = ["tablets", "capsules", "liquid"]

@dataclass
class Condition:
    name: str
    description: str
    medicines: List[Medicine]
    home_remedies: List[str]
    red_flags: List[str]
    
class MedicalAssistant:
    def __init__(self):
        self.model = model
        self.system_prompt = """
        You are a medical information assistant providing OTC medicine recommendations.
        Always follow these guidelines:
        1. Provide 3-5 possible conditions based ONLY on the given symptoms
        2. Suggest 2-4 OTC medicines relevant to the symptoms
        3. Do NOT recommend antibiotics, steroids, or prescription drugs
        4. Explain why each medicine helps
        5. Include 2-3 home remedies
        6. List red-flag symptoms that require a doctor's visit
        7. Consider the patient's age when making recommendations
        8. Be clear and concise
        """
    
    def _initialize_medicine_db(self) -> Dict[str, Medicine]:
        """Initialize the database of common OTC medicines"""
        return {
            # Pain and Fever
            "acetaminophen": Medicine(
                name="Acetaminophen (Tylenol)",
                description="Reduces fever and relieves mild to moderate pain.",
                age_restriction="Not recommended for children under 2 years without doctor's advice.",
                common_forms=["tablets", "liquid", "suppositories"]
            ),
            "ibuprofen": Medicine(
                name="Ibuprofen (Advil, Motrin)",
                description="Reduces inflammation, fever, and pain.",
                age_restriction="Not recommended for infants under 6 months.",
                common_forms=["tablets", "liquid", "chewables"]
            ),
            
            # Cold and Flu
            "dextromethorphan": Medicine(
                name="Dextromethorphan (Delsym, Robitussin DM)",
                description="Suppresses cough.",
                age_restriction="Not recommended for children under 4 years.",
                common_forms=["liquid", "lozenges"]
            ),
            "guaifenesin": Medicine(
                name="Guaifenesin (Mucinex, Robitussin)",
                description="Thins and loosens mucus to ease congestion.",
                common_forms=["tablets", "liquid"]
            ),
            
            # Allergy
            "loratadine": Medicine(
                name="Loratadine (Claritin)",
                description="Relieves allergy symptoms like sneezing, runny nose, and itchy/watery eyes.",
                age_restriction="Not recommended for children under 2 years.",
                common_forms=["tablets", "liquid"]
            ),
            "diphenhydramine": Medicine(
                name="Diphenhydramine (Benadryl)",
                description="Relieves allergy symptoms and can cause drowsiness.",
                age_restriction="Not recommended for children under 6 years without doctor's advice.",
                common_forms=["tablets", "liquid"]
            ),
            
            # Stomach
            "bismuth_subsalicylate": Medicine(
                name="Bismuth subsalicylate (Pepto-Bismol)",
                description="Relieves heartburn, indigestion, nausea, and diarrhea.",
                age_restriction="Not recommended for children under 12 years.",
                common_forms=["liquid", "chewable tablets"]
            ),
            "loperamide": Medicine(
                name="Loperamide (Imodium A-D)",
                description="Controls diarrhea symptoms.",
                age_restriction="Not recommended for children under 6 years.",
                common_forms=["capsules", "liquid"]
            ),
            
            # Topical
            "hydrocortisone_cream": Medicine(
                name="Hydrocortisone Cream (0.5%-1%)",
                description="Relieves skin irritation, itching, and inflammation.",
                common_forms=["cream", "ointment"]
            ),
            "antifungal_cream": Medicine(
                name="Clotrimazole (Lotrimin AF)",
                description="Treats fungal skin infections like athlete's foot, jock itch, and ringworm.",
                common_forms=["cream", "powder", "spray"]
            ),
        }
    
    def _initialize_condition_db(self) -> Dict[str, Condition]:
        """Initialize the database of conditions and their treatments"""
        return {
            # Cold
            "common_cold": Condition(
                name="Common Cold",
                description="Viral infection of the nose and throat.",
                medicines=[
                    self.medicine_db["acetaminophen"],
                    self.medicine_db["dextromethorphan"],
                    self.medicine_db["guaifenesin"]
                ],
                home_remedies=[
                    "Drink warm liquids like tea with honey and lemon",
                    "Use a humidifier or take a steamy shower to ease congestion",
                    "Gargle with warm salt water to soothe a sore throat"
                ],
                red_flags=[
                    "High fever (above 101°F/38.3°C) lasting more than 3 days",
                    "Severe headache, facial pain, or sinus pain",
                    "Difficulty breathing or shortness of breath",
                    "Symptoms lasting more than 10 days without improvement"
                ]
            ),
            
            # Allergic Rhinitis
            "allergic_rhinitis": Condition(
                name="Allergic Rhinitis (Hay Fever)",
                description="Allergic response causing sneezing, runny nose, and itchy eyes.",
                medicines=[
                    self.medicine_db["loratadine"],
                    self.medicine_db["diphenhydramine"]
                ],
                home_remedies=[
                    "Use a HEPA air filter to reduce allergens",
                    "Rinse nasal passages with saline solution",
                    "Keep windows closed during high pollen seasons"
                ],
                red_flags=[
                    "Severe or persistent symptoms not relieved by OTC medications",
                    "Asthma symptoms like wheezing or difficulty breathing",
                    "Signs of infection (yellow/green nasal discharge, fever)",
                    "Severe sinus pain or pressure"
                ]
            ),
            
            # Heartburn
            "heartburn": Condition(
                name="Heartburn/Indigestion",
                description="Burning sensation in the chest caused by stomach acid reflux.",
                medicines=[
                    self.medicine_db["bismuth_subsalicylate"],
                    self.medicine_db["famotidine"]
                ],
                home_remedies=[
                    "Eat smaller, more frequent meals",
                    "Avoid lying down for at least 2-3 hours after eating",
                    "Elevate the head of your bed by 6-8 inches"
                ],
                red_flags=[
                    "Severe chest pain or pressure (could indicate heart attack)",
                    "Difficulty swallowing or pain with swallowing",
                    "Unintentional weight loss",
                    "Symptoms persisting for more than 2 weeks"
                ]
            ),
            
            # Diarrhea
            "diarrhea": Condition(
                name="Acute Diarrhea",
                description="Loose, watery stools occurring more frequently than usual.",
                medicines=[
                    self.medicine_db["loperamide"],
                    self.medicine_db["bismuth_subsalicylate"]
                ],
                home_remedies=[
                    "Stay hydrated with oral rehydration solutions or clear broths",
                    "Follow the BRAT diet (bananas, rice, applesauce, toast)",
                    "Avoid dairy, fatty foods, and caffeine"
                ],
                red_flags=[
                    "Signs of dehydration (dizziness, dry mouth, dark urine)",
                    "Blood or pus in stool",
                    "High fever (above 101°F/38.3°C)",
                    "Diarrhea lasting more than 2 days (1 day for children)"
                ]
            ),
            
            # Skin Rash
            "skin_rash": Condition(
                name="Mild Skin Rash/Irritation",
                description="Red, itchy, or inflamed skin from irritation or mild allergic reaction.",
                medicines=[
                    self.medicine_db["hydrocortisone_cream"],
                    self.medicine_db["diphenhydramine"]
                ],
                home_remedies=[
                    "Apply cool, wet compresses to the affected area",
                    "Use fragrance-free moisturizers",
                    "Wear loose, breathable clothing"
                ],
                red_flags=[
                    "Rash covering a large area of the body",
                    "Blisters, open sores, or signs of infection (pus, increasing pain, warmth)",
                    "Fever or swelling of the face or extremities",
                    "Difficulty breathing or swelling of the mouth/throat"
                ]
            )
        }
    
    def _generate_with_gemini(self, prompt: str) -> Optional[str]:
        """Generate text using the Gemini model."""
        if not self.model:
            return "Error: Gemini API is not properly configured."
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error generating response: {e}")
            return None

    def get_recommendations(self, symptoms: List[str], age: int, duration: str) -> Dict[str, Any]:
        """
        Get medical recommendations based on symptoms, age, and duration using Gemini API.
        
        Args:
            symptoms: List of symptoms the user is experiencing
            age: The user's age in years
            duration: How long symptoms have been present (e.g., '2 days', '1 week')
            
        Returns:
            Dict containing conditions, medicines, home remedies, and red flags
        """
        # Determine age group for better context
        if age <= 2:
            age_group = AgeGroup.INFANT
        elif age <= 12:
            age_group = AgeGroup.CHILD
        elif age <= 19:
            age_group = AgeGroup.TEEN
        elif age <= 64:
            age_group = AgeGroup.ADULT
        else:
            age_group = AgeGroup.SENIOR

        # Prepare the prompt for Gemini
        prompt = f"""
        {self.system_prompt}
        
        Patient Information:
        - Age: {age} years old ({age_group.value})
        - Symptoms: {', '.join(symptoms)}
        - Duration: {duration}
        
        Please provide recommendations following the guidelines above.
        Structure your response with clear sections for conditions, OTC medicines, home remedies, and red flags.
        """

        # Get response from Gemini
        response_text = self._generate_with_gemini(prompt)
        
        if not response_text:
            return {
                "error": "Unable to generate recommendations at this time. Please try again later.",
                "conditions": []
            }

        # Parse the response into a structured format
        try:
            # This is a simple parser - in a production environment, you might want to use
            # more sophisticated parsing or ask Gemini to return structured JSON
            return self._parse_gemini_response(response_text, age_group)
        except Exception as e:
            print(f"Error parsing response: {e}")
            return {
                "response_text": response_text,  # Return raw response if parsing fails
                "conditions": []
            }
    
    def _parse_gemini_response(self, response_text: str, age_group: AgeGroup) -> Dict[str, Any]:
        """
        Parse the Gemini response into a structured format.
        This is a basic implementation that can be enhanced based on your needs.
        """
        # In a real implementation, you would parse the response text into a structured format
        # For now, we'll return the raw text with some basic structure
        return {
            "conditions": [{
                "name": "Condition Analysis",
                "description": response_text,
                "medicines": [],  # Would be populated in a real implementation
                "home_remedies": [],  # Would be populated in a real implementation
                "red_flags": []  # Would be populated in a real implementation
            }],
            "age_group": age_group.value,
            "raw_response": response_text
        }

def format_recommendations(response: Dict[str, Any]) -> str:
    """Format the recommendations into a user-friendly string."""
    if 'error' in response:
        return response['error']
    
    # If we have a raw response from Gemini, return it directly
    if 'raw_response' in response and response['raw_response']:
        return response['raw_response']
    
    # Fallback to the structured format
    output = []
    
    if not response.get('conditions'):
        return "No specific recommendations available for your symptoms. Please consult a healthcare professional."
    
    for condition in response['conditions']:
        if 'description' in condition:
            output.append(condition['description'])
        else:
            output.append(f"## {condition.get('name', 'Condition')}")
            
            if 'medicines' in condition and condition['medicines']:
                output.append("\n### Possible OTC Medicines:")
                for med in condition['medicines']:
                    output.append(f"- **{med['name']}**: {med['description']}")
                    if 'age_restriction' in med and med['age_restriction']:
                        output.append(f"  - *Note*: {med['age_restriction']}")
                    if 'common_forms' in med and med['common_forms']:
                        output.append(f"  - *Available as*: {', '.join(med['common_forms'])}")
            
            if 'home_remedies' in condition and condition['home_remedies']:
                output.append("\n### Home Remedies:")
                for remedy in condition['home_remedies']:
                    output.append(f"- {remedy}")
            
            if 'red_flags' in condition and condition['red_flags']:
                output.append("\n### When to See a Doctor:")
                for flag in condition['red_flags']:
                    output.append(f"- {flag}")
        
        output.append("\n" + "-"*50 + "\n")
    
    return "\n".join(output) if output else "No recommendations available."

# Example usage
if __name__ == "__main__":
    try:
        # Initialize the medical assistant
        assistant = MedicalAssistant()
        
        # Example 1: Cold symptoms
        print("=== Example 1: Cold Symptoms ===")
        response = assistant.get_recommendations(
            symptoms=["cough", "sore throat", "congestion"],
            age=30,
            duration="2 days"
        )
        print(format_recommendations(response))
        
        # Example 2: Allergy symptoms
        print("\n=== Example 2: Allergy Symptoms ===")
        response = assistant.get_recommendations(
            symptoms=["sneezing", "itchy eyes", "runny nose"],
            age=10,
            duration="1 week"
        )
        print(format_recommendations(response))
        
    except Exception as e:
        print(f"Error: {e}")
        print("Please make sure you have set up the GEMINI_API_KEY in your environment variables.")
        print("You can get an API key from: https://ai.google.dev/")
        print("Then set it in your environment or in the .env file as GEMINI_API_KEY=your_api_key_here")
