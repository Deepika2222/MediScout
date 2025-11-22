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
