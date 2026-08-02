import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const DestructorRoute: React.FC = () => {
  // TODO: Implement logic to route all traffic here if destructor mode is active
  const isDestructorActive = false; // Mock

  if (!isDestructorActive) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
