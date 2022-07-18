import React, { useRef } from 'react';

import './Map.css';

export const Map = (props) => {
  const mapRef = useRef();
  
  const map = new window.google.maps.Map(mapRef.current, {
    zoom: props.zoom,
    center: props.center,
  });

  new window.google.maps.Marker({ position: props.center, map });

  return <div ref={mapRef} className={`map ${props.className}`}></div>;
};
