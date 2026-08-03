import React from 'react';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg'
  };

  const initial = alt.charAt(0).toUpperCase();

  return (
    <div className={`${sizes[size]} rounded-full bg-background-secondary border border-border flex items-center justify-center overflow-hidden shrink-0`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-mono text-text-secondary">{initial}</span>
      )}
    </div>
  );
};
