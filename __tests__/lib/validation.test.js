import { isPhoneComplete, MIN_PHONE_LENGTH } from '../../src/lib/validation';

describe('isPhoneComplete', () => {
  it('rejects input shorter than the minimum dialable length', () => {
    expect(isPhoneComplete('')).toBe(false);
    expect(isPhoneComplete('12345')).toBe(false);
    expect(isPhoneComplete('9'.repeat(MIN_PHONE_LENGTH - 1))).toBe(false);
  });

  it('accepts input at or above the minimum length', () => {
    expect(isPhoneComplete('9'.repeat(MIN_PHONE_LENGTH))).toBe(true);
    expect(isPhoneComplete('(555) 123-4567')).toBe(true);
  });
});
