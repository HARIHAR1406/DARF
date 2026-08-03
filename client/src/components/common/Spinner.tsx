import React from 'react';
import { motion } from 'framer-motion';

export const Spinner: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    className={`rounded-full border-2 border-border border-t-primary ${className}`}
    style={{ width: size, height: size }}
  />
);
