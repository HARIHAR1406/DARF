import React from 'react';
import { Outlet } from 'react-router-dom';

export const DestructorLayout: React.FC = () => {
  // TODO: Set up layout strictly for corrupted simulation (no navigation)
  return (
    <div className="min-h-screen bg-black text-danger overflow-hidden">
      <Outlet />
    </div>
  );
};
