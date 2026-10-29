import React from 'react';
import Renderer, {act} from 'react-test-renderer';
import {RideProvider, useRide} from '../src/store/RideContext';
import {places, searchPlaces} from '../src/constants/rides';
let state: ReturnType<typeof useRide>;
function Probe() {
  state = useRide();
  return null;
}
let app: Renderer.ReactTestRenderer;
beforeEach(async () => {
  await act(() => {
    app = Renderer.create(
      <RideProvider>
        <Probe />
      </RideProvider>,
    );
  });
});
afterEach(async () => {
  await act(() => app.unmount());
});
test('destination search handles partial names, case, whitespace and empty matches', () => {
  expect(searchPlaces(' DADA ').map(p => p.name)).toContain('Dadar');
  expect(searchPlaces('no matching place')).toHaveLength(0);
  expect(searchPlaces('')).toHaveLength(4);
});
test('confirmation requires a destination and preserves the selected fare', async () => {
  await act(() => state.confirmRide());
  expect(state.trips).toHaveLength(0);
  await act(() => {
    state.setDestination(places[4]);
    state.setSelected('xl');
    state.setPayment('Cash');
  });
  await act(() => state.confirmRide());
  expect(state.trips[0]).toEqual({
    destination: 'Dadar',
    ride: 'UberXL',
    price: 444.64,
  });
  expect(state.payment).toBe('Cash');
});
test('editing the selected ride does not change earlier activity', async () => {
  await act(() => {
    state.setDestination(places[4]);
    state.setSelected('go');
    state.setSchedule('Tomorrow, 10:30 PM');
  });
  await act(() => state.confirmRide());
  await act(() => {
    state.setSelected('sedan');
    state.setPickup('Bandra');
  });
  expect(state.trips[0].ride).toBe('Uber Go AC');
  expect(state.schedule).toBe('Tomorrow, 10:30 PM');
  expect(state.pickup).toBe('Bandra');
});
