import React from 'react';
import { motion } from 'framer-motion';
import { Card, Input } from '../../components/common';

const HistoryPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col h-full">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-bold mb-6 shrink-0">
        Interaction History
      </motion.h1>
      
      <div className="mb-6 shrink-0">
        <Input placeholder="Search logs..." className="max-w-md" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex-1 overflow-y-auto space-y-4 pb-12 pr-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-heading font-medium">Diagnostic Session #{i}</h3>
              <span className="text-xs font-mono text-text-secondary">2 hours ago</span>
            </div>
            <p className="text-sm font-mono text-text-secondary truncate">
              User: Initialize protocol... AI: Protocol initialized successfully.
            </p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
export default HistoryPage;
