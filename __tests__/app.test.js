import { removeTrip } from './src/client/js/app';

describe('removeTrip button', () => {
  test('Trip gets removed when removeTrip button is clicked', () => {
    const removeButton = document.getElementById('removetrip');
    const tripList = document.getElementsByClassName('trip');
    const tripListLength = tripList.length;

    removeButton.onclick();

    expect(tripList.length < tripListLength).toBeTruthy();
  });
});
