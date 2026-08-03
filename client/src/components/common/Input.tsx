import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, label, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && <label className="text-sm font-mono text-text-secondary">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full bg-background-secondary border rounded p-2 text-sm text-text-DEFAULT outline-none transition-colors duration-200 placeholder:text-text-secondary/50 font-mono",
          error ? "border-danger focus:border-danger" : "border-border focus:border-primary",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger font-mono mt-1">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
