const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

const port = 3000;
const geonamesKey = '&maxRows=10&username=emimalo';
const geoBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const weatherKey = '1ca4e103be734bb6994f0b53f9fc8599';
const weatherBaseURL = 'http://api.weatherbit.io/v2.0/current';
const picKey = '19091279-5aaac9c62fda7a6ba2ae7ab8b';
const picBaseURL = 'https://pixabay.com/api/';

const listening = () => {
  console.log(`running on localhost: ${port}`);
};

app.listen(port, listening);

async function getTravelData(req, res) {
  const destination = req.query.placename;
  const geonamesData = await axios.get(`${geoBaseURL}${destination}${geonamesKey}`);
  const { lat, lng } = geonamesData.data.postalCodes[0];

  const weatherData = await axios.get(`${weatherBaseURL}?lat=${lat}&lon=${lng}&key=${weatherKey}`);
  const { temp, clouds } = weatherData.data.data[0];

  const picture = await axios.get(`${picBaseURL}?key=${picKey}&q=${destination}`);
  const finalPicture = picture.data.hits[0].webformatURL;

  const data = {
    lat, lng, temp, clouds, finalPicture,
  };
  res.send(data);
}

app.get('/traveldata', getTravelData);
