/**
 * Phone-number entry is considered complete once it reaches the minimum
 * dialable length. Kept as a single source of truth so the submit gate and
 * the button's enabled/disabled styling never drift apart.
 */
export const MIN_PHONE_LENGTH = 10;

export const isPhoneComplete = (value) => value.length >= MIN_PHONE_LENGTH;
