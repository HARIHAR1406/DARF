import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationLinks } from './NavigationLinks';
import { MobileMenu } from './MobileMenu';
import { Button } from '../common';
import { useSession } from '../../hooks/useSession';

export const Header: React.FC = () => {
  const { isAuthenticated } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-border h-16 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center space-x-8">
        <Link to="/" className="font-heading font-bold text-xl tracking-tight hover:text-primary transition-colors">
          DARF
        </Link>
        <div className="hidden md:flex">
          <NavigationLinks />
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        {isAuthenticated ? (
          <Link to="/chat">
            <Button variant="primary" size="sm">Launch App</Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </>
        )}
      </div>
      
      <div className="md:hidden flex items-center">
        <MobileMenu />
      </div>
    </header>
  );
};
