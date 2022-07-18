import React, { useRef } from 'react';

import './Map.css';

export const Map = (props) => {
  const mapRef = useRef();
  const key = 'AIzaSyA_ueprReUuOO_CzCB2ELbcPgrj0_acq6A';
  const map = new window.google.maps.Map(mapRef.current, {
    zoom: props.zoom,
    center: props.center,
  });

  new window.google.maps.Marker({ position: props.center, map });

  return <div ref={mapRef} className={`map ${props.className}`}></div>;
};
