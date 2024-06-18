const APIKey = 'f8cccf3bc8c79d27312f3bbb77168586';

var button = document.querySelector('.button'); 
var inputValue = document.querySelector('.inputValue'); 
var nameElement = document.querySelector('.name'); 
var descElement = document.querySelector('.desc'); 
var tempElement = document.querySelector('.temp'); 

const queryURLgeo = `https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=74.0060&appid=${APIKey}`;
const queryURLcity = `https://api.openweathermap.org/data/2.5/forecast?q=Gillette&appid=${APIKey}`;


fetch(queryURLcity)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        nameElement.textContent = data.city.name;
        descElement.textContent = data.list[0].weather[0].description;
        tempElement.textContent = `${Math.round(data.list[0].main.temp - 273.15)}°C`; 
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

fetch(queryURLgeo)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

