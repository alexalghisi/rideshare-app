/**
 * Catalog of selectable ride tiers shown on the ride-options screen.
 * Prices are display-ready strings owned by this catalog.
 */
export const RIDE_OPTIONS = [
  {
    id: '1',
    name: 'RideShare X',
    icon: '🚗',
    time: '3 min',
    price: '$8.50',
    capacity: '4 seats',
    description: 'Affordable everyday rides',
  },
  {
    id: '2',
    name: 'RideShare Comfort',
    icon: '🚙',
    time: '5 min',
    price: '$14.20',
    capacity: '4 seats',
    description: 'Newer cars with extra legroom',
    popular: true,
  },
  {
    id: '3',
    name: 'RideShare XL',
    icon: '🚐',
    time: '7 min',
    price: '$18.90',
    capacity: '6 seats',
    description: 'Room for up to 6 passengers',
  },
  {
    id: '4',
    name: 'RideShare Lux',
    icon: '🚘',
    time: '8 min',
    price: '$32.50',
    capacity: '4 seats',
    description: 'High-end cars with top-rated drivers',
  },
];

/** The popular tier is pre-selected when the screen opens. */
export const DEFAULT_RIDE_ID = RIDE_OPTIONS.find((ride) => ride.popular).id;

export const getRideById = (id) => RIDE_OPTIONS.find((ride) => ride.id === id);
