import React from 'react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass p-8 rounded-2xl max-w-md w-full text-center"
      >
        <h1 className="text-4xl font-heading font-bold text-text-DEFAULT mb-4">
          DARF
        </h1>
        <p className="text-text-secondary mb-6 font-mono text-sm uppercase tracking-widest">
          Redirect. Protect. Rebuild.
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary/90 text-background font-medium py-2 px-6 rounded transition-colors shadow-[0_0_15px_rgba(16,163,127,0.5)]"
          >
            System Status
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
