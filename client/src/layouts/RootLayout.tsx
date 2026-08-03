import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components/navigation';
import { Loader } from '../components/common';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-DEFAULT font-body selection:bg-primary selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col relative w-full">
        <Suspense fallback={<div className="flex items-center justify-center h-[50vh]"><Loader size={32} /></div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
