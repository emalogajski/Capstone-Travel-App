const { getGeonamesData, getWeatherbitData, getPixabayData } = require('./API');

/**
 * calls 3 APIs and collects their data
 * @param {object} req request object (express)
 * @param {object} res response object (express)
 */
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

module.exports = {
  getTravelData,
};
