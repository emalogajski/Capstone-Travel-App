const { getGeonamesData, getWeatherbitData, getPixabayData } = require('./API');

async function getTravelData(req, res) {
  const destination = req.query.placename;
  const geonamesData = await getGeonamesData(destination);
  console.log('geonamesData :>> ', geonamesData);
  const { lat, lng } = geonamesData.data.postalCodes[0];

  console.log('lat :>> ', lat);
  console.log('lng :>> ', lng);

  const weatherData = await getWeatherbitData(lat, lng);
  const { temp, clouds } = weatherData.data.data[0];

  const picture = await getPixabayData(destination);
  const finalPicture = picture.data.hits[0].webformatURL;

  const data = {
    lat, lng, temp, clouds, finalPicture,
  };
  res.send(data);
}

module.exports = {
  getTravelData,
};
