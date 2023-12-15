// accessing HTML Elements

const home = document.querySelector(".main")
const input = document.querySelector('.search-input')
const button = document.querySelector('#add')
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

// default values

const defaultCity = "Maribor";
const apiKey = 'your-own-api-Key';

// Initial Location

window.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();
    const cityName = localStorage.getItem("cityName") ? localStorage.getItem("cityName") : defaultCity
    fetchData(cityName);
});

// Search Location

button.addEventListener('click', function (event) {
    event.preventDefault()
    const cityName = input.value;
    fetchData(cityName)
    document.activeElement.blur();
    localStorage.setItem("cityName", cityName);
})

// Fetch Function

const fetchData = async function(cityName) {
    const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    const responseData = await result.json();
    if (responseData.cod === "404") return console.error("Something went wrong!"), error.innerText = `Location ${cityName} not found! Please retry...`, localStorage.setItem("cityName", defaultCity);
    // error kad nema više display appa
    // if (responseData.cod === "404") return home.style.display = "none", error.innerText = `There is no location named ${city}.`
    console.log(responseData)
    return displayWeather(responseData), error.innerText = ``;
}

// funkcija da ti loada sve informacije za vrijeme za lokaciju, data smo loadali iz fetcha

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
