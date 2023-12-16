// import API_Keys

import { API_KEY_OpenWeather, API_KEY_IPLocation } from "./config.js"

// accessing HTML Elements

const body = document.querySelector('body');
const home = document.querySelector(".main")
const input = document.querySelector('.search-input')
const button = document.querySelector('#add')
const geoLocationButton = document.querySelector(".geo-location")
const city = document.querySelector(".city-name");
const weather = document.querySelector('.div-3-description')
const weatherIcon = document.querySelector('.weather-status')
const temperature = document.querySelector('.div-1-temp')
const realFeel = document.querySelector('.div-2-real-feel')
const warning = document.querySelector('.div-caution')
const warningIcon = document.querySelector('.caution-icon')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const pressure = document.getElementById('pressure')
const error = document.querySelector('.error')
const dateDisplay = document.querySelector('.time-date-container')
const sunriseDisplay = document.querySelector('.sunrise')
const sunsetDisplay = document.querySelector('.sunset')
const defaultPhoto = document.querySelector('.default-photo')
const footer = document.querySelector('footer');

// default values

const defaultCity = "Maribor";
const apiKeyOpenWeather = API_KEY_OpenWeather;
const apiKeyIPLocation = API_KEY_IPLocation;
let locationByIP = null;
let geoCodedCity = null;

// IP Location API

const fetchIPLocationAPI = async () => {
    try {
        const result = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${apiKeyIPLocation}`)
        if (!result.ok) {
            throw new Error('Network response was not ok.');
          }
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

fetchIPLocationAPI()
    .then(data => {
        locationByIP = data.city.name;
        return locationByIP;
    })
    .catch(error => {
        console.error('Error during fetch:', error);
  });

// Geolocation Browser

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        displayLocation(lat, lng);
      },
      (error) => {
        console.error("Error:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

const displayLocation = async (lat, lng) => {
    const result = await fetch (`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    const data = await result.json();
    geoCodedCity = data.city;
    return geoCodedCity;
}

// Intial Location - either defaultCity or localStorage

window.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();
    const cityName = localStorage.getItem("cityName") ? localStorage.getItem("cityName") : defaultCity
    fetchData(cityName);
});

// Search Location - by clicking on "Search"

button.addEventListener('click', function (event) {
    event.preventDefault()
    const cityName = input.value;
    fetchData(cityName)
    document.activeElement.blur();
    input.value = ""
    localStorage.setItem("cityName", cityName);
})

// Search Location - by clicking on "Enter / Return"

window.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const cityName = input.value;
        fetchData(cityName)
        document.activeElement.blur();
        input.value = ""
        localStorage.setItem("cityName", cityName);
    }
})

// Get Location by IP or GeoLocation

geoLocationButton.addEventListener('click', function (event) {
    event.preventDefault()
    const cityName = !geoCodedCity ? locationByIP : geoCodedCity;
    fetchData(cityName);
    localStorage.setItem("cityName", cityName);
})

// Fetch Function

const fetchData = async function(cityName) {
    const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyOpenWeather}&units=metric`)
    const responseData = await result.json();
    if (responseData.cod === "404") return console.error("Something went wrong!"), error.innerText = `Location ${cityName} not found! Please retry...`, localStorage.setItem("cityName", defaultCity);

    // if (responseData.cod === "404") return home.style.display = "none", error.innerText = `There is no location named ${city}.`
    console.log(responseData)
    return displayWeather(responseData), error.innerText = ``, changeBackground(responseData);
}

// Display Weather Function

const displayWeather = (data) => {
    temperature.innerText = `${Math.round(data.main.temp.toFixed(1))} °C`;
    // weather.children[1].innerText = data.weather[0].main;
    const regionNames = new Intl.DisplayNames(["en"], {type: "region"})
    city.innerText = `${data.name}, ${regionNames.of(data.sys.country)}`;
    realFeel.innerText = `Real feel: ${data.main.feels_like.toFixed(1)} °C`;
    humidity.children[1].innerText = `${data.main.humidity} %`;
    wind.children[1].innerText = `${data.wind.speed.toFixed(1)} km/h`;
    pressure.children[1].innerText = `${data.main.pressure} psi`;
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    warning.children[1].innerText =`${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}`
    warningIcon.innerHTML = `<img class="caution-icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></img>`
    // Date Formatting
    const date = new Date((data.dt + data.timezone - 3600) * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dateDisplay.innerText = `${days[date.getDay()]} - ${date.toLocaleDateString("en-SI")}`
    const sunrise = new Date((data.sys.sunrise + data.timezone - 3600) * 1000)
    sunriseDisplay.innerText = `${sunrise.toLocaleTimeString("en-SI")}`
    const sunset = new Date((data.sys.sunset + data.timezone - 3600) * 1000)
    sunsetDisplay.innerText = `${sunset.toLocaleTimeString("en-SI")}`
}

// ARRAY OF BACKGROUNDS for SEASONS

let arrayOfBackgrounds = [];

arrayOfBackgrounds.push("./background/Background_fall.jpg")
arrayOfBackgrounds.push("./background/Background_spring.jpg")
arrayOfBackgrounds.push("./background/Background_summer.jpg")
arrayOfBackgrounds.push("./background/Background_winter.jpg")
arrayOfBackgrounds.push("./background/Background_weather.jpg")

// Change Background Function (depending on temperature)

const changeBackground = (data) => {
    const temp = Math.round(data.main.temp)
    if (temp <= 0) {
        body.style.backgroundImage = `url(${arrayOfBackgrounds[3]})`;
        footer.style.color = "black";
        error.style.color = "black";
    } else if (temp > 0 && temp <= 10) {
        body.style.backgroundImage = `url(${arrayOfBackgrounds[0]})`;
        error.style.color = "white";
        footer.style.color = "white";
    } else if (temp >= 20) {
        body.style.backgroundImage = `url(${arrayOfBackgrounds[2]})`;
        footer.style.color = "white";
        error.style.color = "white";
    } else {
        body.style.backgroundImage = `url(${arrayOfBackgrounds[1]})`;
        footer.style.color = "black";
        error.style.color = "black";
    }
}

// Change Background to default photo

defaultPhoto.addEventListener('click', function (event) {
    event.preventDefault()
    body.style.backgroundImage = `url(${arrayOfBackgrounds[4]})`
    error.style.color = "white";
})