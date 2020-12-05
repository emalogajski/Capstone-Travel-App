// import { removeTrip } from '../src/client/js/app';

describe('removeTrip button', () => {
  test('Trip gets removed when removeTrip button is clicked', () => {
    const tripList = document.getElementById('trips');
    const removeButton = document.getElementById('removetrip');

    document.body.innerHTML = `<div id="managetrips">
    <button id="generate">Take me there</button>
    <button id="removetrip">Remove Last Added Trip</button>
</div><div id="trips">
    <div class="trips"></div>
    </div>`;

    removeButton.click();

    expect(tripList.childNodes.length === 0).toBeTruthy();
  });
});
