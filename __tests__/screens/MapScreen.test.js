import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MapScreen from '../../src/screens/MapScreen';

const renderScreen = (destination) => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const route = { params: destination ? { destination } : undefined };
  const utils = render(<MapScreen navigation={navigation} route={route} />);
  return { navigation, ...utils };
};

describe('MapScreen', () => {
  it('prefills the dropoff from the incoming destination', () => {
    const { getByDisplayValue } = renderScreen({ name: 'Airport' });
    expect(getByDisplayValue('Airport')).toBeTruthy();
    expect(getByDisplayValue('Current Location')).toBeTruthy();
  });

  it('leaves the dropoff empty when opened without a destination', () => {
    const { getByPlaceholderText } = renderScreen();
    expect(getByPlaceholderText('Where to?').props.value).toBe('');
  });

  it('confirms pickup with the resolved pickup and dropoff', () => {
    const { navigation, getByText } = renderScreen({ name: 'Airport' });

    fireEvent.press(getByText('Confirm Pickup'));

    expect(navigation.navigate).toHaveBeenCalledWith(
      'RideOptions',
      expect.objectContaining({
        pickup: expect.objectContaining({ name: 'Current Location' }),
        dropoff: expect.objectContaining({ name: 'Airport' }),
      })
    );
  });

  it('goes back when the back control is pressed', () => {
    const { navigation, getByText } = renderScreen({ name: 'Airport' });
    fireEvent.press(getByText('←'));
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
