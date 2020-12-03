import './styles/style.scss'

import {
  getTravelData,
  displayData,
  removeTrip,
} from './js/app'

const generate = document.getElementById('generate');
const removeTripButton = document.getElementById('removetrip');
generate.addEventListener('click', getTravelData);
removeTripButton.addEventListener('click', removeTrip);

export {
  getTravelData,
  displayData,
  removeTrip,
};
