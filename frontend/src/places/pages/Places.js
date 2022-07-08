import React from 'react';
import { Outlet } from 'react-router-dom';

export const Places = () => {
  return (
    <div>
      <h1>Places Page</h1>
      <Outlet />
    </div>
  );
};
