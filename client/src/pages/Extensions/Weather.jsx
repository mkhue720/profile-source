import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import './extension.css';

const Weather = () => {
  useEffect(() => {
    const cityInput = document.querySelector(".city-input");
    const searchButton = document.querySelector(".search-btn");
    const locationButton = document.querySelector(".location-btn");
    const currentWeatherDiv = document.querySelector(".current-weather");
    const weatherCardsDiv = document.querySelector(".weather-cards");
    const API_KEY = "05d084b4bb2c5f7d9f4b107544ee25fe";

    const createWeatherCard = (cityName, weatherItem, index) => {
      if (index === 0) {
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
      } else {
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
      }
    };

    const getWeatherDetails = (cityName, latitude, longitude) => {
      const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      fetch(WEATHER_API_URL)
        .then((response) => response.json())
        .then((data) => {
          // Filter the forecasts to get only one forecast per day
          const uniqueForecastDays = [];
          const fiveDaysForecast = data.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
              return uniqueForecastDays.push(forecastDate);
            }
          });

          // Clearing previous weather data
          cityInput.value = "";
          currentWeatherDiv.innerHTML = "";
          weatherCardsDiv.innerHTML = "";

          // Creating weather cards and adding them to the DOM
          fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
              currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
              weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
          });
        })
        .catch(() => {
          alert("An error occurred while fetching the weather forecast!");
        });
    };

    const getCityCoordinates = () => {
      const cityName = cityInput.value.trim();
      if (cityName === "") return;
      const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

      // Get entered city coordinates (latitude, longitude, and name) from the API response
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          if (!data.length) return alert(`No coordinates found for ${cityName}`);
          const { lat, lon, name } = data[0];
          getWeatherDetails(name, lat, lon);
        })
        .catch(() => {
          alert("An error occurred while fetching the coordinates!");
        });
    };

    const getUserCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords; // Get coordinates of user location
          // Get city name from coordinates using reverse geocoding API
          const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
          fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
              const { name } = data[0];
              getWeatherDetails(name, latitude, longitude);
            })
            .catch(() => {
              alert("Có lỗi xảy ra khi lấy thông tin vị trí hiện tại.");
            });
        },
        (error) => {
          // Show alert if user denied the location permission
          if (error.code === error.PERMISSION_DENIED) {
            alert("Yêu cầu vị trí bị từ chối. Hãy cấp quyền truy cập vị trí cho trình duyệt.");
          } else {
            alert("Lỗi yêu cầu vị trí. Hãy thử lại sau.");
          }
        }
      );
    };

    // Thêm bắt sự kiện sau khi DOM đã được tải hoàn toàn
    const addEventListeners = () => {
      locationButton.addEventListener("click", getUserCoordinates);
      searchButton.addEventListener("click", getCityCoordinates);
      cityInput.addEventListener("keyup", (e) => e.key === "Enter" && getCityCoordinates());
    };

    if (document.readyState === 'loading') {
      // Nếu DOM chưa được tải hoàn toàn, đợi sự kiện DOMContentLoaded
      document.addEventListener('DOMContentLoaded', addEventListeners);
    } else {
      // Nếu DOM đã tải hoàn toàn, thêm bắt sự kiện ngay lập tức
      addEventListeners();
    }

    // Cleanup function để loại bỏ bắt sự kiện khi component bị unmount
    return () => {
      locationButton.removeEventListener("click", getUserCoordinates);
      searchButton.removeEventListener("click", getCityCoordinates);
      cityInput.removeEventListener("keyup", (e) => e.key === "Enter" && getCityCoordinates());
    };
  }, []); // Mảng phụ thuộc trống đảm bảo rằng effect này chỉ chạy một lần sau khi render ban đầu

  return (
    <>
      <Helmet>
        <title>Weather App | NMK</title>
      </Helmet>
      <div className="weather__container">
        <div className="weather__input">
          <h3>Enter a City Name</h3>
          <input className="city-input" type="text" placeholder="E.g., New York, London, Tokyo" />
          <button className="search-btn">Search</button>
          <div className="separator" />
          <button className="location-btn">Use Current Location</button>
        </div>
        <div className="weather-data">
          <div className="current-weather">
            <div className="details">
              <h2>_______ ( ______ )</h2>
              <h6>Temperature: __°C</h6>
              <h6>Wind: __ M/S</h6>
              <h6>Humidity: __%</h6>
            </div>
          </div>
          <div className="days-forecast">
            <h2>5-Day Forecast</h2>
            <ul className="weather-cards">
              <li className="card">
                <h3>( ______ )</h3>
                <h6>Temp: __C</h6>
                <h6>Wind: __ M/S</h6>
                <h6>Humidity: __%</h6>
              </li>
              <li className="card">
                <h3>( ______ )</h3>
                <h6>Temp: __C</h6>
                <h6>Wind: __ M/S</h6>
                <h6>Humidity: __%</h6>
              </li>
              <li className="card">
                <h3>( ______ )</h3>
                <h6>Temp: __C</h6>
                <h6>Wind: __ M/S</h6>
                <h6>Humidity: __%</h6>
              </li>
              <li className="card">
                <h3>( ______ )</h3>
                <h6>Temp: __C</h6>
                <h6>Wind: __ M/S</h6>
                <h6>Humidity: __%</h6>
              </li>
              <li className="card">
                <h3>( ______ )</h3>
                <h6>Temp: __C</h6>
                <h6>Wind: __ M/S</h6>
                <h6>Humidity: __%</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
