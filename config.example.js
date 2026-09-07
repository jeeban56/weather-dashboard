// Weather Dashboard Configuration Example
// Rename this file to config.js and add your actual API key

const CONFIG = {
    // OpenWeatherMap API Configuration
    WEATHER_API: {
        // Get your free API key at: https://openweathermap.org/api
        API_KEY: 'YOUR_API_KEY_HERE',
        BASE_URL: 'https://api.openweathermap.org/data/2.5',
        
        // Units: metric (Celsius), imperial (Fahrenheit), standard (Kelvin)
        UNITS: 'metric',
        
        // Language for weather descriptions
        LANG: 'en'
    },

    // Application Settings
    APP: {
        // Auto-refresh interval in minutes (0 = disabled)
        AUTO_REFRESH_INTERVAL: 0,
        
        // Default city to load on startup
        DEFAULT_CITY: 'London',
        
        // Enable/disable geolocation
        ENABLE_GEOLOCATION: true,
        
        // Error message display duration in seconds
        ERROR_DISPLAY_DURATION: 5,
        
        // Forecast days to display
        FORECAST_DAYS: 5,
        
        // Hourly forecast periods to display
        HOURLY_PERIODS: 8
    },

    // UI Configuration
    UI: {
        // Temperature unit display (°C or °F)
        TEMPERATURE_UNIT: '°C',
        
        // Wind speed unit (m/s, km/h, mph)
        WIND_SPEED_UNIT: 'km/h',
        
        // Animation enabled
        ANIMATIONS_ENABLED: true,
        
        // Theme colors
        THEME: {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#51cf66',
            danger: '#ff6b6b',
            warning: '#ffd43b'
        }
    },

    // Cache Configuration
    CACHE: {
        // Enable caching of weather data
        ENABLED: true,
        
        // Cache duration in minutes
        DURATION: 10,
        
        // Use localStorage
        USE_LOCAL_STORAGE: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}