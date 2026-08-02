import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  // TODO: Add admin-specific sidebar and secure header
  return (
    <div className="flex h-screen bg-background-secondary text-text-DEFAULT">
      <aside className="w-64 bg-background border-r border-border p-4">
        {/* Admin Navigation Placeholder */}
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
