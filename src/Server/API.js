const geonamesKey = '&maxRows=10&username=emimalo';
const geoBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const weatherKey = '1ca4e103be734bb6994f0b53f9fc8599';
const weatherBaseURL = 'http://api.weatherbit.io/v2.0/current';
const picKey = '19091279-5aaac9c62fda7a6ba2ae7ab8b';
const picBaseURL = 'https://pixabay.com/api/';
const axios = require('axios');

const getGeonamesData = (destination) => axios.get(`${geoBaseURL}${destination}${geonamesKey}`);

const getWeatherbitData = (lat, lng) => axios.get(`${weatherBaseURL}?lat=${lat}&lon=${lng}&key=${weatherKey}`);

const getPixabayData = (destination) => axios.get(`${picBaseURL}?key=${picKey}&q=${destination}`);

export { getGeonamesData, getPixabayData, getWeatherbitData };
