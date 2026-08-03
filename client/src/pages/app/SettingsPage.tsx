import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/common';

const SettingsPage: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 overflow-y-auto h-full">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-bold mb-8">
        Settings
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
        <Card>
          <h3 className="text-lg font-heading font-medium mb-4">Appearance</h3>
          <div className="flex items-center justify-between p-3 border border-border rounded bg-background">
            <span className="font-mono text-sm text-text-secondary">Theme Preference</span>
            <span className="text-primary text-sm font-medium">Dark Mode (Forced)</span>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-medium mb-4">Notifications</h3>
          <p className="text-text-secondary font-mono text-sm">Configure system alerts.</p>
        </Card>
      </motion.div>
    </div>
  );
};
export default SettingsPage;
