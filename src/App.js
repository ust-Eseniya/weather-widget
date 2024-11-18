import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    if (query) {
      try {
        setLoading(true);
        const apiKey = '496682d4b33c6e8a6ef861f9dfed7282';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="weather-widget">
    <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter location" />
    <button onClick={handleSearch} disabled={loading}>{loading ? 'Loading...' : 'Search'}</button>
      {weather ? (
        <>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Weather Conditions: {weather.weather[0].description}</p>
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}

function App() {
  return <WeatherWidget />;
}

export default App;
