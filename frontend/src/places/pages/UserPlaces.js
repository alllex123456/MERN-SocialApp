import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { PlaceList } from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

export const UserPlaces = () => {
  const { userId } = useParams();
  const [loadedUserPlaces, setLoadedUserPlaces] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${userId}/places`
        );
        setLoadedUserPlaces(responseData.places);
      } catch (error) {}
    };
    fetchData();
  }, [userId, sendRequest]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUserPlaces && (
        <PlaceList places={loadedUserPlaces} />
      )}
      <Outlet />
    </div>
  );
};
