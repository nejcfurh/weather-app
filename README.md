This is a basic weather app with simple design and look.

It is using vanilla JS and presents simple DOM Manipulation along with an intro into asynchronous javascript. CSS is not responsive. 

There are three API's in use. First one is OpenWeather API - with FREE plan for retrieving weather data, the second one is IP Location API for retrieving location via IP if the user rejects the Browser GeoLocation prompt. The third one is the Reverse Geocoding API by BigDataCloud for retrieving city name from more accurate location. 

Currently "geolocation" will work regardlessly if the users rejects the browser location prompt or not (the location will be less accurate via the IP location - it can also be false if the user is using VPN).

Searching for location will dynamically change the background with regard to temperature (there are four different backgrounds for each of the seasons). You can get back to default photo at each search option, but it will be overwritten if the new location search is started (this might be removed in the future).

Can be freely reused for inspiration.

![PreviewWeatherApp](https://github.com/NF-7/WeatherApp/assets/101887698/5ea8b46a-2456-4aed-811f-12ff6e3e034a)
