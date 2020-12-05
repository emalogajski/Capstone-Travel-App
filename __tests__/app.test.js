// import { removeTrip } from '../src/client/js/app';

const { removeTrip } = require("../src/client/js/app");

describe('removeTrip button', () => {
  test('Trip gets removed when removeTrip button is clicked', () => {
    document.body.innerHTML = `<div id="managetrips">
    <button id="generate">Take me there</button>
    <button id="removetrip">Remove Last Added Trip</button>
    </div><div id="trips">
    <div class="trips"></div>
    </div>`;

    const tripList = document.getElementById('trips');
    const tripListLength = tripList.childNodes.length;
    removeTrip();
    expect(tripListLength - tripList.childNodes.length === 1).toBeTruthy();
  });
});
