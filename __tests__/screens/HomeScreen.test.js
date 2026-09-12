import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { RECENT_PLACES, SAVED_PLACES } from '../../src/data/places';

const renderScreen = () => {
  const navigation = { navigate: jest.fn() };
  const utils = render(<HomeScreen navigation={navigation} />);
  return { navigation, ...utils };
};

describe('HomeScreen', () => {
  it('renders recent and saved places', () => {
    const { getByText } = renderScreen();
    [...RECENT_PLACES, ...SAVED_PLACES].forEach((place) => {
      expect(getByText(place.name)).toBeTruthy();
      expect(getByText(place.address)).toBeTruthy();
    });
  });

  it('opens the map for a selected saved place', () => {
    const { navigation, getByText } = renderScreen();

    fireEvent.press(getByText('Airport'));

    expect(navigation.navigate).toHaveBeenCalledWith('Map', {
      destination: SAVED_PLACES.find((p) => p.name === 'Airport'),
    });
  });

  it('opens the map for a typed destination on submit', () => {
    const { navigation, getByPlaceholderText } = renderScreen();

    const input = getByPlaceholderText('Where to?');
    fireEvent.changeText(input, 'Golden Gate Park');
    fireEvent(input, 'submitEditing');

    expect(navigation.navigate).toHaveBeenCalledWith('Map', {
      destination: { name: 'Golden Gate Park', address: 'Golden Gate Park' },
    });
  });

  it('does not navigate on submit when the search field is empty', () => {
    const { navigation, getByPlaceholderText } = renderScreen();

    fireEvent(getByPlaceholderText('Where to?'), 'submitEditing');

    expect(navigation.navigate).not.toHaveBeenCalled();
  });

  it('opens the map directly from the View Map action', () => {
    const { navigation, getByText } = renderScreen();

    fireEvent.press(getByText('View Map'));

    expect(navigation.navigate).toHaveBeenCalledWith('Map');
  });
});
