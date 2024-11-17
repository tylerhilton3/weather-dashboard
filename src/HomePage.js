import React, { useEffect, useState } from 'react';

function HomePage() {
  const [weatherData, setWeatherData] = useState([]);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai'];

  useEffect(() => {
    const fetchWeatherData = async () => {
      const cityWeatherData = await Promise.all(
        cities.map(async (city) => {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${apiKey}&units=metric`;
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`);
          return await response.json();
        })
      );
      setWeatherData(cityWeatherData);
    };

    fetchWeatherData().catch((error) => console.error(error));
  }, [apiKey]);

  return (
    <div>
      <h2>Weather for Major Cities</h2>
      <div className="city-weather">
        {weatherData.map((city, index) => (
          <div key={index} className="city-card">
            <h3>{city.name}, {city.sys.country}</h3>
            <p><strong>Temperature:</strong> {city.main.temp} °C</p>
            <p><strong>Weather:</strong> {city.weather[0].description}</p>
            <p><strong>Humidity:</strong> {city.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {city.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
