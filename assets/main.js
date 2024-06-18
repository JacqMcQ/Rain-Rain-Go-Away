const APIKey = 'f8cccf3bc8c79d27312f3bbb77168586';
var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

const queryURLgeo = `https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=74.0060&appid=${APIKey}`;
const queryURLcity = `https://api.openweathermap.org/data/2.5/forecast?q=Tucson&appid=${APIKey}`;

fetch(queryURLcity)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Further processing of data here
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });