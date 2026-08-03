import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-background-secondary text-text-secondary border-border',
    primary: 'bg-primary/10 text-primary border-primary/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    success: 'bg-success/10 text-success border-success/20',
  };

  return (
    <span 
      className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border font-medium', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
