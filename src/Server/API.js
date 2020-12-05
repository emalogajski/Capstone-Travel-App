const geonamesKey = '&maxRows=10&username=emimalo';
const geoBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const weatherKey = '1ca4e103be734bb6994f0b53f9fc8599';
const weatherBaseURL = 'http://api.weatherbit.io/v2.0/current';
const picKey = '19091279-5aaac9c62fda7a6ba2ae7ab8b';
const picBaseURL = 'https://pixabay.com/api/';
const axios = require('axios');
/**
 * calls geonames API and returns a promise
 * @param {string} destination name of place to travel to
 */
const getGeonamesData = (destination) => axios.get(`${geoBaseURL}${destination}${geonamesKey}`);
/**
 * calls weatherbit API and returns a promise
 * @param {number} lat latitude of place to travel to
 * @param {number} lng longitude of place to travel to
 */
const getWeatherbitData = (lat, lng) => axios.get(`${weatherBaseURL}?lat=${lat}&lon=${lng}&key=${weatherKey}`);
/**
 * calls pixabay API and returns a promise
 * @param {string} destination name of place to travel to
 */
const getPixabayData = (destination) => axios.get(`${picBaseURL}?key=${picKey}&q=${destination}`);

module.exports = { getGeonamesData, getPixabayData, getWeatherbitData };
