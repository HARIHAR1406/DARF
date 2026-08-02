import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProtectedWrapper } from '../components/authentication/ProtectedWrapper';

export const ProtectedRoute: React.FC = () => {
  return (
    <ProtectedWrapper>
      <Outlet />
    </ProtectedWrapper>
  );
};
