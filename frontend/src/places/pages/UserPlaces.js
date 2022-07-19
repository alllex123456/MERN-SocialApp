import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { PlaceList } from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=w408-h272-k-no',
    address: '20 W 34th St., New York, NY 10001, Statele Unite ale Americii',
    location: {
      lat: 40.7484445,
      lng: -73.9878531,
    },
    description:
      'Clădire emblematică de birouri în stil Art Deco din 1931, cu exponate și observatoare la etajele 86 și 102.',
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Taj Mahal',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPs5ptSYsVyEfwYmykXwQRkF-NZH8W5eMU_smnT=w408-h306-k-no',
    address:
      'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    location: {
      lat: 27.1751448,
      lng: 78.0399535,
    },
    description:
      'Mausoleu din marmură în stil mogul din sec. XVII, cu minarete, o moschee și grădini de o simetrie renumită.',
    creator: 'u2',
  },
];

export const UserPlaces = () => {
  const { userId } = useParams();
  const userPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return (
    <div>
      <PlaceList places={userPlaces} />
      <Outlet />
    </div>
  );
};
