import { getGeonamesData, getWeatherbitData, getPixabayData } from './API';

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

const port = 3000;

const listening = () => {
  console.log(`running on localhost: ${port}`);
};

app.listen(port, listening);
async function getTravelData(req, res) {
  const destination = req.query.placename;
  const geonamesData = await getGeonamesData(destination);
  const { lat, lng } = geonamesData.data.postalCodes[0];

  const weatherData = await getWeatherbitData(lat, lng);
  const { temp, clouds } = weatherData.data.data[0];

  const picture = await getPixabayData(destination);
  const finalPicture = picture.data.hits[0].webformatURL;

  const data = {
    lat, lng, temp, clouds, finalPicture,
  };
  res.send(data);
}

app.get('/traveldata', getTravelData);
