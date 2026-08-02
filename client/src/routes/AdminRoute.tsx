import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute: React.FC = () => {
  // TODO: Implement admin role check logic
  const isAdmin = false; // Mock

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
