import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, glass = true, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-xl border border-border p-6 shadow-sm',
        glass ? 'glass' : 'bg-background-secondary',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});
Card.displayName = 'Card';
