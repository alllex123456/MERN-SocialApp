import React from 'react';

import { UserItem } from './UserItem';
import Card from '../../shared/components/UIElements/Card';

import './UsersList.css';

export const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="center">
        <h2>No users yet</h2>
      </Card>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};
