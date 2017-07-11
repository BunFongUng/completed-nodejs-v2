const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const forecastApiKey = '683e3b7cbca0b851f99370500ce745e5';
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Enter your current address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, response) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        weather.fetchWeather(response.lat, response.lng, (errorMessage, responseData) => {
            if(errorMessage) {
                return console.log(errorMessage);
            }
            console.log('Your current temperature is ', responseData.temperature);
        });
    }
});
