import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader } from './Loader';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "disabled"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors duration-200 outline-none disabled:opacity-50 disabled:pointer-events-none font-mono';
  
  const variants = {
    primary: 'bg-primary text-background hover:bg-primary/90 shadow-[0_0_10px_rgba(16,163,127,0.3)]',
    secondary: 'bg-background-secondary text-text-DEFAULT border border-border hover:border-text-secondary',
    danger: 'bg-danger text-white hover:bg-danger/90',
    ghost: 'bg-transparent text-text-secondary hover:text-text-DEFAULT hover:bg-background-secondary',
    glass: 'glass hover:bg-background-secondary/80 text-text-DEFAULT'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-8 text-base'
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ duration: 0.12 }}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? <Loader size={size === 'sm' ? 14 : 18} /> : children}
    </motion.button>
  );
});
Button.displayName = 'Button';
