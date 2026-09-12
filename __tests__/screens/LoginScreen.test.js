import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';

const renderScreen = () => {
  const navigation = { replace: jest.fn() };
  const utils = render(<LoginScreen navigation={navigation} />);
  return { navigation, ...utils };
};

describe('LoginScreen', () => {
  it('does not continue until a complete phone number is entered', () => {
    const { navigation, getByText } = renderScreen();

    fireEvent.press(getByText('Continue'));

    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it('continues to Home once a complete phone number is entered', () => {
    const { navigation, getByText, getByPlaceholderText } = renderScreen();

    fireEvent.changeText(getByPlaceholderText('(555) 123-4567'), '5551234567');
    fireEvent.press(getByText('Continue'));

    expect(navigation.replace).toHaveBeenCalledWith('Home');
  });

  it('lets social sign-in continue without a phone number', () => {
    const { navigation, getByText } = renderScreen();

    fireEvent.press(getByText('Continue with Google'));
    expect(navigation.replace).toHaveBeenCalledWith('Home');

    fireEvent.press(getByText('Continue with Apple'));
    expect(navigation.replace).toHaveBeenCalledTimes(2);
  });
});
