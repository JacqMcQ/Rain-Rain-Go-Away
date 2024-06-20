const APIKey = 'f8cccf3bc8c79d27312f3bbb77168586';

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const nameElement = document.querySelector('.name');
const descElement = document.querySelector('.desc');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windSpeedElement = document.querySelector('.wind-speed');
const weatherIcon = document.querySelector('.weather-icon');
const forecastContainer = document.querySelector('.forecast-cards');
const historyList = document.querySelector('.history-list');

// Load initial search history
renderInitialSearchHistory();

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

        Promise.all([
            fetch(currentWeatherURL).then(response => response.json()),
            fetch(forecastURL).then(response => response.json())
        ])
        .then(([currentWeatherData, forecastData]) => {
            updateCurrentWeather(currentWeatherData);
            updateForecast(forecastData);
            addToHistory(city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
    } else {
        alert('Please enter a city name.');
    }
});

function updateCurrentWeather(data) {
    nameElement.textContent = data.name;
    descElement.textContent = data.weather[0].description;
    tempElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.src = iconURL;
    weatherIcon.alt = data.weather[0].description;
}

function updateForecast(data) {
    forecastContainer.innerHTML = '';

    const dailyForecasts = data.list.filter((forecast, index) => index % 8 === 0);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <h3>${weekday}</h3>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <p>${forecast.weather[0].description}</p>
            <p>${Math.round(forecast.main.temp - 273.15)}°C</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

function addToHistory(city) {
    if (isCityInHistory(city)) {
        return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.classList.add('history-item');
    listItem.addEventListener('click', function() {
        getWeatherForCity(city);
    });
    historyList.appendChild(listItem);

    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
}

function isCityInHistory(city) {
    const existingCities = Array.from(historyList.children);
    return existingCities.some(item => item.textContent.toLowerCase() === city.toLowerCase());
}

function renderInitialSearchHistory() {
    historyList.innerHTML = '';

    const cities = JSON.parse(localStorage.getItem('cities')) || [];

    cities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.classList.add('history-item');
        listItem.addEventListener('click', function() {
            getWeatherForCity(city);
        });
        historyList.appendChild(listItem);
    });
}

function getWeatherForCity(city) {
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    Promise.all([
        fetch(currentWeatherURL).then(response => response.json()),
        fetch(forecastURL).then(response => response.json())
    ])
    .then(([currentWeatherData, forecastData]) => {
        updateCurrentWeather(currentWeatherData);
        updateForecast(forecastData);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    });
}
