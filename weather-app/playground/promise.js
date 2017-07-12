const request = require('request');

let fetchWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to forecast.io server.');
            } else if(response.statusCode === 400) {
                reject('Unable to fetch weather.');
            } else if(response.statusCode === 200) {
                resolve({
                    temperature: body.currently.temperature
                });
            }
        });
    });
};

fetchWeather(11.5438951, 104.915527)
    .then((responseData) => {
        // console.log(JSON.stringify(responseData, undefined, 2));
        return responseData;
    })
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
    })
    .catch((err) => {
        console.log(err);
    });

