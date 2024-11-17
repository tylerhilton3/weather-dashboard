import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';

function SearchPage() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSearch = () => {
    if (city.trim() !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setCity('');
        })
        .catch((error) => {
          alert(error.message);
          setWeatherData(null);
        });
    } else {
      alert('Please enter a city name.');
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {weatherData && <WeatherInfo data={weatherData} />}
    </div>
  );
}

export default SearchPage;
