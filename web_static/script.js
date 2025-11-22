// Configuration
const API_BASE_URL = 'http://127.0.0.1:5000'; // Flask Backend

// DOM Elements
const searchInput = document.getElementById('medicine-search');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const symptomForm = document.getElementById('symptom-form');
const symptomResults = document.getElementById('symptom-results');

// Helper: Show Loading
const showLoading = (element) => {
    element.innerHTML = '<div class="text-center"><p>Loading...</p></div>';
};

// Helper: Show Error
const showError = (element, message) => {
    element.innerHTML = `<div class="text-center text-danger"><p>${message}</p></div>`;
};

// Feature: Search Medicine
if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) return alert('Please enter a medicine name');

        showLoading(resultsContainer);

        try {
            // Save to LocalStorage
            saveRecentSearch(query);

            const response = await fetch(`${API_BASE_URL}/search-medicine?q=${query}`);
            const data = await response.json();

            displayMedicineResults(data.results);
        } catch (error) {
            console.error(error);
            // Fallback for demo if backend is offline/empty
            displayMockMedicineResults(query);
        }
    });
}

// Feature: Symptom Checker
if (symptomForm) {
    symptomForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const symptoms = document.getElementById('symptoms').value;

        showLoading(symptomResults);

        try {
            const response = await fetch(`${API_BASE_URL}/symptom-suggest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: [symptoms] })
            });
            const data = await response.json();

            displaySymptomResults(data.suggestions);
        } catch (error) {
            console.error(error);
            // Fallback for demo
            displayMockSymptomResults();
        }
    });
}

// Display Functions
function displayMedicineResults(results) {
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No medicines found.</p>';
        return;
    }

    resultsContainer.innerHTML = results.map(item => `
        <div class="card">
            <h3>${item.name}</h3>
            <p><strong>Pharmacy:</strong> ${item.pharmacy || 'Unknown'}</p>
            <p><strong>Price:</strong> ${item.price || 'N/A'}</p>
            <p class="${item.available ? 'text-success' : 'text-danger'}">
                ${item.available ? 'Available' : 'Out of Stock'}
            </p>
            <button class="btn btn-secondary" style="margin-top: 1rem; font-size: 0.9rem;">View on Map</button>
        </div>
    `).join('');
}

function displaySymptomResults(suggestions) {
    if (!suggestions || suggestions.length === 0) {
        symptomResults.innerHTML = '<p class="text-center">No suggestions found. Please consult a doctor.</p>';
        return;
    }

    symptomResults.innerHTML = suggestions.map(item => `
        <div class="card">
            <h3>${item.medicine || item}</h3>
            <p><strong>Usage:</strong> ${item.usage || 'Consult pharmacist'}</p>
            <p class="text-danger" style="font-size: 0.9rem; margin-top: 0.5rem;">
                ⚠️ ${item.warning || 'Read label carefully'}
            </p>
        </div>
    `).join('');
}

// Mock Data Fallbacks (for demo purposes)
function displayMockMedicineResults(query) {
    const mockData = [
        { name: query, pharmacy: 'Apollo Pharmacy', price: '$12', available: true },
        { name: query + ' Extra', pharmacy: 'MedPlus', price: '$15', available: false },
    ];
    displayMedicineResults(mockData);
}

function displayMockSymptomResults() {
    const mockData = [
        { medicine: 'Paracetamol', usage: '1 tablet every 6 hours', warning: 'Do not exceed 4g/day' },
        { medicine: 'Ibuprofen', usage: '1 tablet after food', warning: 'Avoid if stomach ulcer' },
    ];
    displaySymptomResults(mockData);
}

// LocalStorage Logic
function saveRecentSearch(query) {
    let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!searches.includes(query)) {
        searches.unshift(query);
        if (searches.length > 5) searches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(searches));
    }
}

// --- Leaflet Map Integration ---

let mapInstance = null;
const mapModal = document.getElementById('map-modal');
const closeModalBtn = document.querySelector('.close-modal');

// Close Modal Logic
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        mapModal.classList.add('hidden');
    });
}

// Close on click outside
window.addEventListener('click', (e) => {
    if (e.target === mapModal) {
        mapModal.classList.add('hidden');
    }
});

// Function to Show Map
function showOnMap(lat, lon, name, address) {
    // 1. Show Modal
    if (mapModal) {
        mapModal.classList.remove('hidden');
        document.getElementById('map-title').innerText = name;
    }

    // 2. Initialize Map (or reset)
    if (mapInstance) {
        mapInstance.remove(); // Clear old map instance
    }

    // 3. Create new Map
    // Use a slight timeout to ensure modal is visible and container has dimensions
    setTimeout(() => {
        mapInstance = L.map('map').setView([lat, lon], 15);

        // 4. Add OpenStreetMap Tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        // 5. Add Marker
        L.marker([lat, lon]).addTo(mapInstance)
            .bindPopup(`<b>${name}</b><br>${address}`)
            .openPopup();
    }, 100);
}

// Update Mock Data to include Lat/Lon for demo
function displayMockMedicineResults(query) {
    const mockData = [
        {
            name: query,
            pharmacy: 'Apollo Pharmacy',
            price: '$12',
            available: true,
            address: 'MG Road, Bangalore',
            lat: 12.9716,
            lon: 77.5946
        },
        {
            name: query + ' Extra',
            pharmacy: 'MedPlus',
            price: '$15',
            available: false,
            address: 'Indiranagar, Bangalore',
            lat: 12.9784,
            lon: 77.6408
        },
    ];
    displayMedicineResults(mockData);
}

// Update Display Logic to use showOnMap
function displayMedicineResults(results) {
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No medicines found.</p>';
        return;
    }

    resultsContainer.innerHTML = results.map(item => `
        <div class="card">
            <h3>${item.name}</h3>
            <p><strong>Pharmacy:</strong> ${item.pharmacy || 'Unknown'}</p>
            <p><strong>Price:</strong> ${item.price || 'N/A'}</p>
            <p class="${item.available ? 'text-success' : 'text-danger'}">
                ${item.available ? 'Available' : 'Out of Stock'}
            </p>
            <button 
                class="btn btn-secondary" 
                style="margin-top: 1rem; font-size: 0.9rem;"
                onclick="showOnMap(${item.lat || 12.9716}, ${item.lon || 77.5946}, '${item.pharmacy || 'Pharmacy'}', '${item.address || 'Unknown Address'}')"
            >
                View on Map
            </button>
        </div>
    `).join('');
}
