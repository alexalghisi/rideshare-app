import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('boots into the login screen', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText('Welcome to RideShare')).toBeTruthy());
  });
});
