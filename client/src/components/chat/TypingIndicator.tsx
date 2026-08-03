import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '../common';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full mb-6 justify-start">
      <div className="flex max-w-[80%] gap-4 flex-row">
        <Avatar alt="ai" size="sm" />
        <div className="p-4 rounded-xl bg-background-secondary border border-border rounded-tl-none flex items-center space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-text-secondary rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
