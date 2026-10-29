import React, {createContext, useContext, useState} from 'react';
import {rides, Place} from '../constants/rides';
type Trip = {destination: string; ride: string; price: number};
type RideState = {
  destination: Place | null;
  setDestination: (place: Place) => void;
  pickup: string;
  setPickup: (value: string) => void;
  selected: string;
  setSelected: (id: string) => void;
  payment: string;
  setPayment: (value: string) => void;
  schedule: string;
  setSchedule: (value: string) => void;
  stop: string;
  setStop: (value: string) => void;
  rider: string;
  setRider: (value: string) => void;
  trips: Trip[];
  confirmRide: () => void;
};
const Context = createContext<RideState | null>(null);
export function RideProvider({children}: {children: React.ReactNode}) {
  const [destination, setDestination] = useState<Place | null>(null);
  const [stop, setStop] = useState('');
  const [rider, setRider] = useState('For me');
  const [pickup, setPickup] = useState('home');
  const [selected, setSelected] = useState('go');
  const [payment, setPayment] = useState('Select payment method');
  const [schedule, setSchedule] = useState('Pickup now');
  const [trips, setTrips] = useState<Trip[]>([]);
  const confirmRide = () => {
    const ride = rides.find(r => r.id === selected);
    if (ride && destination)
      setTrips(items => [
        {destination: destination.name, ride: ride.name, price: ride.price},
        ...items,
      ]);
  };
  return (
    <Context.Provider
      value={{
        destination,
        setDestination,
        pickup,
        setPickup,
        selected,
        setSelected,
        payment,
        setPayment,
        schedule,
        setSchedule,
        stop,
        setStop,
        rider,
        setRider,
        trips,
        confirmRide,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useRide() {
  const context = useContext(Context);
  if (!context) throw new Error('RideProvider is required');
  return context;
}
