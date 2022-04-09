class UI {
    constructor() {

        this.location = document.getElementById('w-location');
        this.description = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.icon = document.getElementById('w-icon');
        this.details = document.getElementById('w-details');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.minMaxTemp = document.getElementById('w-min-max-temp');
        this.wind = document.getElementById('w-wind');
    }

    setWeather(weather) {

        this.location.textContent = `${weather.location.city}, ${weather.location.state}`;

        this.description.textContent = `${weather.weather[0].main}`;

        this.string.textContent = `${UI.convertFromKelvin(weather.main.temp, 'C')}\u00B0C (${UI.convertFromKelvin(weather.main.temp, 'F')}\u00B0F)`;
        
        this.icon.src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
        
        this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
        
        this.feelsLike.textContent = `Feels Like: ${UI.convertFromKelvin(weather.main.feels_like, 'C')}\u00B0C (${UI.convertFromKelvin(weather.main.feels_like, 'F')}\u00B0F)`;
        
        this.minMaxTemp.textContent = `Min: ${UI.convertFromKelvin(weather.main.temp_min, 'C')}\u00B0C (${UI.convertFromKelvin(weather.main.temp_min, 'F')}\u00B0F) Max: ${UI.convertFromKelvin(weather.main.temp_max, 'C')}\u00B0C (${UI.convertFromKelvin(weather.main.temp_max, 'F')}\u00B0F)`;
        
        this.wind.textContent = `Wind: ${(weather.wind.speed*3.6).toFixed(1)} km/h (${(weather.wind.speed*2.237).toFixed(1)} mp/h)`;
    }

    static convertFromKelvin(value, type) {
        switch (type) {
            case 'F':
                return ((value - 273.15) *9/5 + 32).toFixed(1);
            case 'C': 
                return (value - 273.15).toFixed(1);
            default:
                return value;
        }
    }
}