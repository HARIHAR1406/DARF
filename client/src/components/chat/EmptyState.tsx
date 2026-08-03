import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full text-center space-y-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
        <span className="text-primary font-heading font-bold text-2xl">D</span>
      </div>
      <h2 className="text-2xl font-heading font-semibold text-text-DEFAULT">Initialize Interface</h2>
      <p className="text-text-secondary font-mono text-sm max-w-sm">
        Awaiting input command. Transmit queries, diagnostics, or operational commands below.
      </p>
    </motion.div>
  );
};
