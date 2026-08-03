import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, User, Settings, LayoutDashboard } from 'lucide-react';
import { clsx } from 'clsx';
import { Tooltip } from '../common';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/history', icon: LayoutDashboard, label: 'History' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-16 md:w-64 border-r border-border bg-background flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-border shrink-0">
        <Link to="/" className="font-heading font-bold text-xl hover:text-primary transition-colors">
          <span className="md:hidden">D</span>
          <span className="hidden md:block">DARF</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col items-center md:items-stretch px-2 space-y-2">
        {links.map((link) => {
          const isActive = path.startsWith(link.to);
          const Icon = link.icon;
          return (
            <Tooltip key={link.to} content={link.label}>
              <Link
                to={link.to}
                className={clsx(
                  "flex items-center justify-center md:justify-start p-3 rounded-lg transition-colors duration-200",
                  isActive ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-background-secondary hover:text-text-DEFAULT"
                )}
              >
                <Icon size={20} />
                <span className="hidden md:block ml-3 font-mono text-sm">{link.label}</span>
              </Link>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
};
