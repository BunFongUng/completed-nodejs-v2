const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Enter your current address",
      string: true
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

geocode.geocodeAddressPromise(argv.address)
    .then((data) => weather.fetchWeatherPromise(data.lat, data.lng, data.address))
    .then((weatherResponse) => {
        console.log(weatherResponse.address);
        console.log(`Your current temperature is ${weatherResponse.temperature}`);
    })
    .catch((err) => {
        console.log(err);
    });