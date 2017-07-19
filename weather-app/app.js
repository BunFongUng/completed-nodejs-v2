const yargs = require("yargs");
const axios = require("axios");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Enter your current address",
      string: true,
      default: 'phnom penh'
    }
  })
  .help()
  .alias("help", "h").argv;

// using callback
// geocode.geocodeAddress(argv.address, (errorMessage, response) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(response.address);
//     weather.fetchWeather(
//       response.lat,
//       response.lng,
//       (errorMessage, responseData) => {
//         if (errorMessage) {
//           return console.log(errorMessage);
//         }
//         console.log(`Your current temperature is ${responseData.temperature}`);
//       }
//     );
//   }
// });

// using with promise
// geocode.geocodeAddressPromise(argv.address)
//     .then((location) => weather.fetchWeatherPromise(location.lat, location.lng, location.address))
//     .then((weatherResponse) => {
//         console.log(weatherResponse.address);
//         console.log(`Your current temperature is ${weatherResponse.temperature}`);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// using axios

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
  .then(location => {
      if(location.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }

    let lat = location.data.results[0].geometry.location.lat;
    let lng = location.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/683e3b7cbca0b851f99370500ce745e5/${lat},${lng}`;

    console.log(location.data.results[0].formatted_address);

    return axios.get(weatherUrl);
  })
  .then(weather => {
    console.log(
      `Your current temperature is ${weather.data.currently.temperature}`
    );
  })
  .catch(err => {
    if(err.code === 'ENOTFOUND') {
        console.log('Unable to connect to google server.');
    } else {
        console.log(err.message);
    }
  });
