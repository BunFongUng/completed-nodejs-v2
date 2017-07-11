const request = require('request');

const fetchWeather = (lat, lng) => {
    request({
        url: `https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        if(!error && response.statusCode === 200) {
            console.log(`current temperture: ${body.currently.temperature}`);
        } else {
            console.log('Unable to fetch weather.');
        }

    });
}

module.exports = {
 fetchWeather
};