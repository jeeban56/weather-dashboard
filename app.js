// Weather API Configuration
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMessage = document.getElementById('errorMessage');
const forecastContainer = document.getElementById('forecastContainer');
const hourlyContainer = document.getElementById('hourlyContainer');
const lastUpdated = document.getElementById('lastUpdated');

// Event Listeners
searchBtn.addEventListener('click', () => handleSearch(searchInput.value));
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(searchInput.value);
});
locationBtn.addEventListener('click', getUserLocation);

// Handle Search
async function handleSearch(cityName) {
    if (!cityName.trim()) {
        showError('Please enter a city name');
        return;
    }

    clearError();
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayCurrentWeather(data);
        await fetchForecast(data.coord.lat, data.coord.lon);
        searchInput.value = '';
    } catch (error) {
        showError(error.message);
    }
}

// Get User Location
function getUserLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    locationBtn.style.opacity = '0.5';
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
            locationBtn.style.opacity = '1';
        },
        (error) => {
            showError('Unable to retrieve your location');
            locationBtn.style.opacity = '1';
        }
    );
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    clearError();
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        displayCurrentWeather(data);
        await fetchForecast(lat, lon);
    } catch (error) {
        showError('Failed to fetch weather data');
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind, clouds, visibility, dt } = data;

    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(main.temp)}°C`;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(main.feels_like)}°C`;
    document.getElementById('weatherDescription').textContent = weather[0].description.toUpperCase();
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    
    // Set weather icon
    const iconCode = weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').alt = weather[0].description;

    // Update last updated time
    const updateTime = new Date(dt * 1000).toLocaleTimeString();
    document.getElementById('lastUpdated').textContent = updateTime;

    // Update background gradient based on weather
    updateBackgroundGradient(weather[0].main);
}

// Fetch Forecast Data
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        displayForecast(data.list);
        displayHourlyForecast(data.list);
    } catch (error) {
        console.error('Failed to fetch forecast:', error);
    }
}

// Display 5-Day Forecast
function displayForecast(forecastList) {
    const dailyData = {};

    // Group forecast by day
    forecastList.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(item);
    });

    forecastContainer.innerHTML = '';
    let dayCount = 0;

    for (const [date, items] of Object.entries(dailyData)) {
        if (dayCount >= 5) break;

        const temps = items.map(item => item.main.temp);
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        const weatherData = items[Math.floor(items.length / 2)]; // Midday weather

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="date">${new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            })}</div>
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Weather icon" class="icon">
            <div class="description">${weatherData.weather[0].description}</div>
            <div class="temp-range">
                <span class="max">${Math.round(maxTemp)}°</span>
                <span class="min">${Math.round(minTemp)}°</span>
            </div>
        `;
        forecastContainer.appendChild(card);
        dayCount++;
    }
}

// Display Hourly Forecast
function displayHourlyForecast(forecastList) {
    hourlyContainer.innerHTML = '';
    const now = new Date();
    const next24Hours = forecastList.filter(item => {
        const itemTime = new Date(item.dt * 1000);
        return itemTime > now && itemTime <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }).slice(0, 8); // Show 8 forecast periods (3-hour intervals = 24 hours)

    next24Hours.forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="time">${time}</div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Weather icon" class="icon">
            <div class="description">${item.weather[0].description}</div>
            <div class="temp">${Math.round(item.main.temp)}°C</div>
        `;
        hourlyContainer.appendChild(card);
    });
}

// Update Background Gradient Based on Weather
function updateBackgroundGradient(weatherMain) {
    const gradients = {
        'Clear': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Clouds': 'linear-gradient(135deg, #667eea 0%, #9fa0d8 100%)',
        'Rain': 'linear-gradient(135deg, #485563 0%, #29323c 100%)',
        'Drizzle': 'linear-gradient(135deg, #667eea 0%, #9fa0d8 100%)',
        'Thunderstorm': 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        'Snow': 'linear-gradient(135deg, #e0eaff 0%, #cfd9df 100%)',
        'Mist': 'linear-gradient(135deg, #a8a8a8 0%, #d3d3d3 100%)',
    };

    const gradient = gradients[weatherMain] || gradients['Clouds'];
    document.body.style.background = gradient;
}

// Error Handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(clearError, 5000);
}

function clearError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// Initialize
function init() {
    console.log('Weather Dashboard initialized');
    console.log('Note: Replace YOUR_OPENWEATHERMAP_API_KEY with your actual API key');
}