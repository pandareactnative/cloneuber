import images from './imagePath';
export const services = [
  {name: 'Trip', image: images.trip, badge: '25%'},
  {name: 'Auto', image: images.auto},
  {name: 'Bike', image: images.bike},
  {name: 'Metro', image: images.metro, badge: 'Promo'},
  {name: 'Intercity', image: images.intercity, badge: '7%'},
  {name: 'Rentals', image: images.rentals},
  {name: 'Bus & Train', image: images.busTrain, badge: 'Promo'},
  {name: 'Reserve', image: images.reserve},
  {name: 'Teens', image: images.teens},
  {name: 'Seniors', image: images.seniors},
  {name: 'Parcel', image: images.parcel},
];
export const rides = [
  {
    id: 'go',
    name: 'Uber Go AC',
    price: 279.96,
    image: images.goAc,
    seats: 4,
    description: 'Affordable compact rides',
    time: '2 min',
    badge: 'Faster',
  },
  {
    id: 'xl',
    name: 'UberXL',
    price: 444.64,
    image: images.xl,
    seats: 6,
    description: 'Affordable rides for groups up to 6',
    time: '2 min',
  },
  {
    id: 'sedan',
    name: 'Go Sedan',
    price: 288.32,
    image: images.sedan,
    seats: 4,
    description: 'Affordable sedans',
    time: '2 min',
  },
  {
    id: 'premier',
    name: 'Premier AC',
    price: 339.28,
    image: images.sedan,
    seats: 4,
    description: 'Comfortable sedans, top-quality drivers',
    time: '2 min',
  },
  {
    id: 'priority',
    name: 'Go Priority',
    price: 320.69,
    image: images.trip,
    seats: 4,
    description: 'Priority pick-up',
    time: '1 min',
  },
  {
    id: 'electric',
    name: 'Electric',
    price: 396.49,
    image: images.trip,
    seats: 4,
    description: 'Comfortable electric sedans',
    time: '5 min',
  },
  {
    id: 'rental',
    name: 'Go Rentals',
    price: 771,
    image: images.rentals,
    seats: 4,
    description: '2 hrs / 20 km',
    time: '2 min away',
  },
  {
    id: 'premium-rental',
    name: 'Premier Rentals',
    price: 967,
    image: images.sedan,
    seats: 4,
    description: 'Hire Sedans by the hour',
    time: '2 min away',
  },
  {
    id: 'xl-rental',
    name: 'XL Rentals',
    price: 1231,
    image: images.xl,
    seats: 6,
    description: 'Hire SUVs by the hour',
    time: '1 min away',
  },
];
export type Place = {name: string; address: string; distance: string};
export const places: Place[] = [
  {
    name: 'Terminal 2',
    address: 'Navpada, Vile Parle East, Andheri East, Mumbai',
    distance: '1.9 km',
  },
  {
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    address: 'Mumbai, Maharashtra',
    distance: '3.7 km',
  },
  {
    name: 'BOM Terminal 2',
    address: 'Navpada, Vile Parle East, Mumbai, Maharashtra',
    distance: '2.2 km',
  },
  {
    name: 'Bandra Terminus',
    address: 'Bandra East, Mumbai, Maharashtra',
    distance: '8.8 km',
  },
  {name: 'Dadar', address: 'Mumbai, Maharashtra, India', distance: '15 km'},
  {
    name: 'Dadar East',
    address: 'Mumbai, Maharashtra, India',
    distance: '14 km',
  },
  {
    name: 'Dadar West',
    address: 'Mumbai, Maharashtra, India',
    distance: '16 km',
  },
  {
    name: 'Dadar Chowpatty',
    address: 'Suryavanshi Kshatriya Sabhagruha, Dadar',
    distance: '14 km',
  },
  {name: 'Dadar TT', address: 'Dadar East, Mumbai', distance: '15 km'},
];
export function searchPlaces(query: string) {
  const q = query.trim().toLowerCase();
  return q
    ? places.filter(p => (p.name + ' ' + p.address).toLowerCase().includes(q))
    : places.slice(0, 4);
}
