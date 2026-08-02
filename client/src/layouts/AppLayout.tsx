import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  // TODO: Add sidebar navigation and top header for the main application
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Placeholder */}
      <div className="w-64 border-r border-border hidden md:block" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
