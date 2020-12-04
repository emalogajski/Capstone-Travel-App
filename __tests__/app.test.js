import { removeTrip } from './src/client/js/app';

describe('removeTrip button', () => {
  test('Trip gets removed when removeTrip button is clicked', () => {
    const tripList = document.getElementsByClassName('trip');
    const tripListLength = tripList.length;

    removeTrip.onclick();

    expect(tripList.length - tripListLength === 1).toBeTruthy();
  });
});
