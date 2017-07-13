const request = require('request');
const axios = require('axios');

let fetchWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature
            });
        } else {
            callback('Unable to fetch weather.');
        }

    });
}

let fetchWeatherPromise = (lat, lng, address) => {
    return new Promise((resolve, reject) => {
        request({
             url: `https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`,
             json: true
        }, (error, response, body) => {
            if(!error && response.statusCode === 200) {
                resolve({
                    address,
                    temperature: body.currently.temperature
                });
            } else {
                reject('Unable to fetch weather.');
            }
        });
    });
}

let fetchWeatherAxios = (lat, lng) => {
    return axios({
        url:`https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`,
        method: 'get',
        responseType: 'json'
    });
}

module.exports = {
    fetchWeather,
    fetchWeatherPromise,
    fetchWeatherAxios
};