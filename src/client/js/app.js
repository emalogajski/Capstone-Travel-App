const dotenv = require('dotenv');

dotenv.config();

const basePath = 'http://localhost:3000';
const tripData = [];

// displayData function places the incoming information into the appropriate HTML sections for
// the user to see
const displayData = () => {
  const newDiv = document.createElement('div');
  const image = document.createElement('img');
  const trips = document.getElementById('trips');
  const weatherAndCountdown = document.createElement('div');
  image.src = tripData[tripData.length - 1].pic;
  const departingDateInput = document.getElementById('departingdate').value;
  const departingDate = new Date(departingDateInput.toString());
  const displayDepartingDate = departingDate.toDateString();
  const departingDateMs = departingDate.getTime();
  const todayMs = new Date(Date.now()).getTime();
  const daysToDeparture = Math.ceil((departingDateMs - todayMs) / (86400000));
  newDiv.append(image, weatherAndCountdown);
  newDiv.classList.add('trips');
  weatherAndCountdown.classList.add('tripdiv');
  trips.prepend(newDiv);
  const h2 = document.getElementsByTagName('h2');
  const removeButton = document.getElementById('removetrip');
  removeButton.style.display = 'inline-block';

  if (h2.length === 0) {
    const title = document.createElement('h2');
    title.innerHTML = 'Your Travel Plan';
    document.body.insertBefore(title, trips);
  } else {
    h2[0].textContent = 'Your Travel Plan';
  }

  if (!daysToDeparture) {
    weatherAndCountdown.innerHTML = `Your trip to ${tripData[tripData.length - 1].dest}:\n\nDeparture Date: ${displayDepartingDate}\nCurrent Temperature: ${tripData[tripData.length - 1].temp}°C\nCurrent Cloud Coverage: ${tripData[tripData.length - 1].clouds}%\nCountdown to Departure: Please choose a departure date above.`;
  } else {
    weatherAndCountdown.innerHTML = `Your trip to ${tripData[tripData.length - 1].dest}:\n\nDeparture Date: ${displayDepartingDate}\nCurrent Temperature: ${tripData[tripData.length - 1].temp}°C\nCurrent Cloud Coverage: ${tripData[tripData.length - 1].clouds}%\nCountdown to Departure: ${daysToDeparture} days`;
  }
};

// getTravelData function receives the data from API calls and passes it onto
// the displayData funciton
const getTravelData = async () => {
  const destination = document.getElementById('tripto').value;
  const res = await fetch(`${basePath}/traveldata?placename=${destination}`);
  try {
    const data = await res.json();
    tripData.push({
      dest: destination,
      pic: data.finalPicture,
      temp: data.temp,
      clouds: data.clouds,
    });
    displayData();
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

// removeTrip function removes the last added trip from the Travel Plan list
const removeTrip = () => {
  const tripList = document.getElementById('trips');
  const h2 = document.getElementsByTagName('h2');
  const removeButton = document.getElementById('removetrip');
  if (tripList.children.length <= 1) {
    h2[0].textContent = 'Your Travel Plan is currently empty.';
    tripList.removeChild(tripList.children[0]);
    removeButton.style.display = 'none';
  } else if (tripList.children.length > 1) {
    tripList.removeChild(tripList.children[0]);
  }
};

export {
  getTravelData,
  displayData,
  removeTrip,
};
