import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import RideOptionsScreen from '../../src/screens/RideOptionsScreen';

const renderScreen = () => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const route = {
    params: {
      pickup: { name: 'Current Location' },
      dropoff: { name: 'Downtown' },
    },
  };
  const utils = render(<RideOptionsScreen navigation={navigation} route={route} />);
  return { navigation, ...utils };
};

describe('RideOptionsScreen', () => {
  it('renders the trip endpoints and ride tiers', () => {
    const { getByText } = renderScreen();
    expect(getByText('Choose a ride')).toBeTruthy();
    expect(getByText('Current Location')).toBeTruthy();
    expect(getByText('Downtown')).toBeTruthy();
    ['RideShare X', 'RideShare Comfort', 'RideShare XL', 'RideShare Lux'].forEach(
      (name) => expect(getByText(name)).toBeTruthy()
    );
  });

  it('defaults to the popular tier for the request CTA', () => {
    const { getByText } = renderScreen();
    expect(getByText('Request RideShare Comfort')).toBeTruthy();
  });

  it('updates the request CTA when another tier is selected', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('RideShare X'));
    expect(getByText('Request RideShare X')).toBeTruthy();
  });

  it('confirms the booking and returns Home after the redirect delay', () => {
    jest.useFakeTimers();
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    try {
      const { navigation, getByText } = renderScreen();

      fireEvent.press(getByText('Request RideShare Comfort'));

      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(navigation.navigate).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    } finally {
      alertSpy.mockRestore();
      jest.useRealTimers();
    }
  });
});
