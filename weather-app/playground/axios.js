const axios = require('axios');

const fetchWeather = (lat, lng) => {
    return axios({
        url:`https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`,
        method: 'get',
        responseType: 'json'
    });
};

fetchWeather(11.5386142, 104.9153667)
    .then((location) => {
        console.log(JSON.stringify(location.data.currently.temperature, undefined, 2));
    })
    .catch((err) => {
        console.log(err);
    });