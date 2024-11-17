import React from 'react';

function WeatherInfo({ data }) {
    // Icon URL from OpenWeatherMap API
    const iconUrl = `https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png`;
    return (
        <div className="weather-info">
            <h2>
                {data.name}, {data.sys.country}
            </h2>
            {/* Display the weather icon */}
            
            <p>
                <strong>Temperature:</strong> {data.main.temp} °C
            </p>
            <p>
                <strong>Weather:</strong> {data.weather[0].main} ({data.weather[0].description})
            </p>
            <p>
                <strong>Humidity:</strong> {data.main.humidity}%
            </p>
            <p>
                <strong>Wind Speed:</strong> {data.wind.speed} m/s
            </p>
            <div className="icon-background">
                <img src={iconUrl} alt={data.weather[0].description} className="weather-icon" />
            </div>
        </div>
    );
}

export default WeatherInfo;
