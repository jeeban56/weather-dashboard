# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard that displays real-time weather data and forecasts using the OpenWeatherMap API.

## Features

✨ **Current Weather Display**
- Real-time temperature and weather conditions
- "Feels like" temperature
- Humidity, wind speed, pressure, and visibility
- Dynamic weather icons

📅 **5-Day Weather Forecast**
- Daily weather predictions
- High/Low temperatures
- Weather descriptions
- Weather icons for each day

⏰ **Hourly Forecast**
- Next 24 hours weather forecast
- 3-hour interval updates
- Temperature trends

🎨 **Beautiful UI**
- Responsive design (mobile, tablet, desktop)
- Dynamic background gradients based on weather conditions
- Smooth animations and transitions
- Clean, intuitive interface

📍 **Location Features**
- Search by city name
- Geolocation-based weather (uses browser GPS)
- Error handling and user feedback

## Getting Started

### Prerequisites
- A modern web browser
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jeeban56/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

3. **Configure the API key**
   - Open `app.js`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

4. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```
   - Visit `http://localhost:8000`

## Usage

### Search by City
1. Enter a city name in the search box
2. Click the "Search" button or press Enter
3. Weather data will be displayed instantly

### Use Current Location
1. Click the 📍 button
2. Allow browser permission to access your location
3. Weather for your current location will be displayed

## API Reference

This dashboard uses the **OpenWeatherMap API** with the following endpoints:

- `weather` - Current weather data
- `forecast` - 5-day weather forecast

**Free tier includes:**
- Current weather
- 5-day forecast
- 60 calls/minute rate limit
- Up to 1000 calls/day

[API Documentation](https://openweathermap.org/api)

## Project Structure

```
weather-dashboard/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── app.js              # JavaScript logic and API calls
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling, gradients, and animations
- **JavaScript (ES6+)** - API integration and DOM manipulation
- **OpenWeatherMap API** - Weather data source

## Features Breakdown

### Current Weather Section
- City name and country
- Current temperature
- Feels-like temperature
- Weather description
- Humidity percentage
- Wind speed (converted to km/h)
- Atmospheric pressure
- Visibility distance
- Last update timestamp

### Forecast Features
- Grouped by date for daily forecast
- Shows high/low temperatures
- Weather conditions with icons
- Hourly predictions for next 24 hours

### Interactive Elements
- Search functionality with error handling
- Geolocation support
- Dynamic background changes
- Loading indicators
- Auto-hide error messages

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Free API tier has rate limits (60 calls/minute)
- Requires valid API key from OpenWeatherMap
- Geolocation may not work over HTTP (use HTTPS)
- Some cities may have slight name variations

## Future Enhancements

- [ ] Weather alerts and warnings
- [ ] Air quality index (AQI) display
- [ ] Weather maps and radar
- [ ] Historical weather data
- [ ] Multiple city comparison
- [ ] Favorite cities bookmark
- [ ] Dark/Light theme toggle
- [ ] Unit conversion (°F, mph, etc.)
- [ ] Local storage for search history
- [ ] Progressive Web App (PWA) support

## Troubleshooting

### "API key not found" error
- Ensure you've replaced the placeholder with your actual API key in `app.js`
- Check that your API key is valid and active on OpenWeatherMap

### "City not found" error
- Try using a different spelling or the full city name
- Check for typos in your search

### Geolocation not working
- Ensure HTTPS is used (required for most browsers)
- Check browser permissions for location access
- Some countries may have geolocation restrictions

### No forecast data
- Verify your API key has access to forecast endpoints
- Check rate limits haven't been exceeded
- Ensure internet connection is stable

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and design inspiration from various weather applications
- Weather emoji from Unicode standard

## Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [OpenWeatherMap API Documentation](https://openweathermap.org/api)
3. Open an issue in the GitHub repository

---

**Happy Weather Tracking! 🌈**