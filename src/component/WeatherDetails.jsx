import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getWeatherData } from "./WeatherApi";
import "./WeatherDetails.css";

const WeatherDetails = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData(city);
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
  }, [city]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!weather) return <h2 className="error">Error loading data</h2>;

  const dailyForecast = weather.list.filter((_, index) => index % 8 === 0);
  const timestamp = weather.list[0].dt * 1000;
  const timezoneOffset = weather.city.timezone * 1000; // Convert to milliseconds
  const localDate = new Date(timestamp + timezoneOffset);
  const formattedDate = localDate.toLocaleDateString();
  const formattedTime = localDate.toLocaleTimeString();

  return (
    <div className="weather-container">
      <div className="background-overlay"></div>
      <div className="weather-content">
        <h1 className="temperature">{Math.round(weather.list[0].main.temp - 273.15)}°</h1>
        <h2 className="city-name">{weather.city.name}</h2>
        <p className="weather-description">{weather.list[0].weather[0].description}</p>

        <p className="weather-time">
          <strong>Data:</strong> {formattedDate}
        </p>
        <p className="weather-time">
          <strong>Ora locale:</strong> {formattedTime}
        </p>

        <div className="weather-details">
          <p>
            <strong>Feels like:</strong> {Math.round(weather.list[0].main.feels_like - 273.15)}°
          </p>
          <p>
            <strong>Cloudiness:</strong> {weather.list[0].clouds.all}%
          </p>
          <p>
            <strong>Humidity:</strong> {weather.list[0].main.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {weather.list[0].wind.speed} km/h
          </p>
        </div>

        <div className="daily-forecast">
          <h3>PROSSIMI GIORNI</h3>
          <div className="forecast-cards">
            {dailyForecast.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
              return (
                <div className="forecast-card" key={index}>
                  <h4>{date.toLocaleDateString()}</h4>
                  <img src={weatherIcon} alt={forecast.weather[0].description} className="forecast-icon" />
                  <p>{Math.round(forecast.main.temp - 273.15)}°</p>
                  <p>{forecast.weather[0].description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
