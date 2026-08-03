import React from 'react';

export const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-full h-px bg-border ${className}`} />
);
