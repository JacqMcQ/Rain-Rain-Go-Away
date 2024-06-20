# Rain-Rain-Go-Away 
A 5-day weather forecast dashboard 

## Introduction:
Welcome to Rain-Rain Go Away, a web application that provides current weather and 5-day forecast information for cities worldwide. This application utilizes the OpenWeatherMap API to fetch weather data, displaying it in a user-friendly interface.

## Features: 
Current Weather Display: Shows current temperature (I prefer celsius as I grew up in Canada), description, humidity, and wind speed for the searched city.Celsius and Farenheit are displayed on the card as I have a lot of family living in Canada and wanted to offer this easy coversion on my application. 

5-Day Weather Forecast: Displays weather forecasts for the next 5 days. 

    -(Two calls are made: One for the current weather and another for the 5-day forecast).

Search History: Maintains a history of searched cities, allowing users to quickly revisit previous searches retrieved from local storage.

Responsive Design: Designed to be responsive and work well on different devices and screen sizes

Error Handling: Specified error handling to indicate if error occurred with fetching from the API or user input. 

## Usage:

1. Search for a City:

Enter the name of a city in the input field and submit the form.
If the city is found, the application will display its current weather and 5-day forecast.

2. View Weather Details:

The current weather section shows temperature, weather description, humidity, and wind speed.
The forecast section displays weather forecasts for the next 5 days, including icons representing weather conditions and temperature.

3. Historical Navigation:

Click on any city in the search history list to quickly fetch and display weather information for that city.

## References:

This application utilizes the OpenWeatherMap API to fetch weather data. In order to fetch the data, an account was extablished and a unique APIKey was appointed for linking to the server. 
The use of AI technology was used to debug the 404 errors reeived when attempting to fetch from the API using the city root value. AI was also used to support the use of the input field for the city to assist with eliminating any white space in order to prevent the submission from throwing an error. API fetch call research retrieved from https://openweathermap.org/forecast5#min. 

Icon usedon loading page was retrieved from: https://www.istockphoto.com/photos/sunny-weather