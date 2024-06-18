document.addEventListener('DOMContentLoaded', function() {
    const APIKey = 'f8cccf3bc8c79d27312f3bbb77168586';

    const weatherForm = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const nameElement = document.querySelector('.name');
    const descElement = document.querySelector('.desc');
    const tempElement = document.querySelector('.temp');

    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const city = cityInput.value.trim();

        if (city) {
            const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

            fetch(queryURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    updateUI(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Failed to fetch weather data. Please try again.');
                });
        } else {
            alert('Please enter a city name.');
        }
    });

    function updateUI(data) {
        nameElement.textContent = data.name;
        descElement.textContent = data.weather[0].description;
        tempElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`; 
    }
});