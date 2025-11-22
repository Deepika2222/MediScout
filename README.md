# MediScout

MediScout is a full-stack application for finding medicines, checking symptoms, and locating nearby pharmacies. It consists of a **Flask** backend and a **React Native** mobile app.

## Project Structure

- \`backend/\`: Flask API with MongoDB.
- \`frontend/\`: React Native (Expo) mobile app.

## Prerequisites

- Node.js & npm
- Python 3.8+
- MongoDB Atlas Account
- Google Maps API Key
- Firebase Project (Auth & Messaging)

## Backend Setup

1.  Navigate to the backend directory:
    \`\`\`bash
    cd backend
    \`\`\`
2.  Create a virtual environment and activate it:
    \`\`\`bash
    python3 -m venv venv
    source venv/bin/activate
    \`\`\`
3.  Install dependencies:
    \`\`\`bash
    pip install -r requirements.txt
    \`\`\`
4.  Create a \`.env\` file in \`backend/\` with the following keys:
    \`\`\`env
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mediscout
    SECRET_KEY=your_secret_key
    GOOGLE_MAPS_API_KEY=your_google_maps_key
    FIREBASE_CREDENTIALS=path/to/firebase-adminsdk.json
    \`\`\`
5.  Run the server:
    \`\`\`bash
    python run.py
    \`\`\`

## Mobile App Setup

1.  Navigate to the frontend directory:
    \`\`\`bash
    cd frontend
    \`\`\`
2.  Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
3.  Create a \`.env\` file in \`frontend/\` (if using expo-env or similar, otherwise configure in app.json/eas.json):
    \`\`\`env
    GOOGLE_MAPS_API_KEY=your_google_maps_key
    \`\`\`
4.  Start the app:
    \`\`\`bash
    npx expo start
    \`\`\`
5.  Scan the QR code with your phone (Expo Go app) or run on an emulator:
    - Press \`a\` for Android Emulator.
    - Press \`i\` for iOS Simulator.

## Features

- **Medicine Search**: Find medicines and check availability.
- **Symptom Checker**: Get OTC suggestions based on symptoms.
- **Nearby Stores**: View pharmacies on Google Maps.
- **Scanner**: OCR-based medicine scanning.
- **Prescriptions**: Upload and manage prescriptions.
