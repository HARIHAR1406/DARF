import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { motion } from 'framer-motion';

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

export const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSession();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
