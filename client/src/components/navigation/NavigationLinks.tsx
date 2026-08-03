import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export const NavigationLinks: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const location = useLocation();
  const links = [
    { to: '/features', label: 'Features' },
    { to: '/docs', label: 'Documentation' },
  ];

  return (
    <nav className={clsx(mobile ? "flex flex-col space-y-4" : "flex items-center space-x-6")}>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={clsx(
            "font-mono text-sm transition-colors duration-200",
            location.pathname === link.to ? "text-primary font-medium" : "text-text-secondary hover:text-text-DEFAULT"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
