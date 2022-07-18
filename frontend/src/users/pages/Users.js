import React from 'react';
import { UsersList } from '../components/UsersList';

export const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Alex',
      image: 'images/avatar.jpg',
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};
