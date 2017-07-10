const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
        console.log(JSON.stringify(response, undefined, 2));
    }
});
