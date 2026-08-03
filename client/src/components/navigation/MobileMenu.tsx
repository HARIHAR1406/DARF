import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavigationLinks } from './NavigationLinks';
import { useSession } from '../../hooks/useSession';
import { Button } from '../common';

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSession();

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 text-text-secondary hover:text-text-DEFAULT">
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-background-secondary border-l border-border z-50 p-6 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-DEFAULT">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col space-y-6" onClick={() => setIsOpen(false)}>
                <NavigationLinks mobile />
                
                <div className="h-px bg-border w-full" />
                
                {isAuthenticated ? (
                  <Link to="/chat" className="w-full">
                    <Button variant="primary" className="w-full">Launch App</Button>
                  </Link>
                ) : (
                  <div className="flex flex-col space-y-3 w-full">
                    <Link to="/login" className="w-full">
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/register" className="w-full">
                      <Button variant="primary" className="w-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
