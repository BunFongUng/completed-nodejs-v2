const request = require('request');
const axios = require('axios');

let geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unabel to find that address.');
        } else if(body.status === 'OK') {
            let address = {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            };
            callback(undefined, address);
        }
    });
}

let geocodeAddressPromise = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to Google server.');
            } else if(body.status === 'ZERO_RESULTS') {
                reject('Unable to find address.');
            } else if(body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

let geocodeAddressAxios = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return axios({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        method: 'get',
        responseType: 'json'
    });
}

module.exports = {
    geocodeAddress,
    geocodeAddressPromise,
};