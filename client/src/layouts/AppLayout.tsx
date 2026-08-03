import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation';
import { Loader } from '../components/common';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background w-full">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader size={32} /></div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
