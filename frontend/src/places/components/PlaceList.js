import React from 'react';
import { PlaceItem } from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';

import './PlaceList.css';
import Button from '../../shared/components/FormElements/Button';

export const PlaceList = (props) => {
  if (props.places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places added</h2>
          <Button>Share a place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};
