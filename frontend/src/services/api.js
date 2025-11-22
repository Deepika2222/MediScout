import axios from 'axios';

// TODO: Replace with your actual backend URL (e.g., from .env)
// For Android Emulator use 'http://10.0.2.2:5000'
// For iOS Simulator use 'http://localhost:5000'
const BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
