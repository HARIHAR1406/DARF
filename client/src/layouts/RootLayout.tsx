import React from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = () => {
  // TODO: Add global providers and main wrapping elements
  return (
    <div className="min-h-screen bg-background text-text-DEFAULT font-body">
      <Outlet />
    </div>
  );
};
