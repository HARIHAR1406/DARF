import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-background py-8 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-heading font-bold text-lg mb-1">DARF Platform</span>
          <span className="font-mono text-xs text-text-secondary">Intelligent AI Interaction Architecture</span>
        </div>
        <div className="flex space-x-6 text-sm font-mono text-text-secondary">
          <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link>
        </div>
        <div className="text-xs text-text-secondary font-mono">
          &copy; {new Date().getFullYear()} DARF. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
