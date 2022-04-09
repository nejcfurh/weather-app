class SessionManager {

    constructor() {
        this.city;
        this.state;
        this.defaultCity = 'Los Angeles'
        this.defaultState = 'California';
    }

    getLocationData() {
        this.city = Boolean(localStorage.getItem('city')) ? localStorage.getItem('city') : this.defaultCity;
        this.state = Boolean(localStorage.getItem('state')) ? localStorage.getItem('state') : this.defaultState;

        return {
            city: this.city,
            state: this.state
        }
    }

    setLocationData(city, state) {
        this.city = city;
        this.state = state;

        localStorage.setItem('city', this.city);
        localStorage.setItem('state', this.state);
    }
}