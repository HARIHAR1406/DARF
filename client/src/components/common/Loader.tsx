import React from 'react';
import { motion } from 'framer-motion';

export const Loader: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <div className={`flex justify-center items-center ${className}`} style={{ height: size }}>
    <motion.div
      className="flex space-x-1"
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="bg-primary rounded-full"
          style={{ width: size / 3, height: size / 3 }}
          variants={{
            initial: { y: 0, opacity: 0.5 },
            animate: { y: [-size/4, size/4, 0], opacity: 1, transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } }
          }}
        />
      ))}
    </motion.div>
  </div>
);
