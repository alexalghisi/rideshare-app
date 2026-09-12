import {
  RIDE_OPTIONS,
  DEFAULT_RIDE_ID,
  getRideById,
} from '../../src/data/rideOptions';

describe('ride options catalog', () => {
  it('exposes a non-empty catalog with unique ids', () => {
    const ids = RIDE_OPTIONS.map((ride) => ride.id);
    expect(RIDE_OPTIONS.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('pre-selects the single popular tier by default', () => {
    const popular = RIDE_OPTIONS.filter((ride) => ride.popular);
    expect(popular).toHaveLength(1);
    expect(DEFAULT_RIDE_ID).toBe(popular[0].id);
  });

  it('looks up rides by id and returns undefined for unknown ids', () => {
    expect(getRideById(DEFAULT_RIDE_ID).name).toBe('RideShare Comfort');
    expect(getRideById('does-not-exist')).toBeUndefined();
  });
});
