import React from 'react';
import { motion } from 'framer-motion';
import { Card, Input, Button, Avatar, Divider } from '../../components/common';
import { useSession } from '../../hooks/useSession';

const ProfilePage: React.FC = () => {
  const { user } = useSession();

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 overflow-y-auto h-full">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-bold mb-8">
        User Profile
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
        <Card>
          <div className="flex items-center space-x-6 mb-8">
            <Avatar size="lg" alt={user?.email || 'User'} />
            <div>
              <h2 className="text-xl font-heading font-medium">{user?.displayName || 'Authorized User'}</h2>
              <p className="text-text-secondary font-mono text-sm">{user?.email}</p>
            </div>
          </div>
          <Divider className="mb-6" />
          <form className="space-y-4 max-w-md">
            <Input label="Username" defaultValue={user?.displayName || ''} />
            <Input label="Bio" placeholder="Enter diagnostic bio..." />
            <Button variant="primary" type="button" className="mt-4">Update Profile</Button>
          </form>
        </Card>
        
        <Card className="border-danger/30">
          <h3 className="text-danger font-heading font-medium mb-2">Security Area</h3>
          <p className="text-text-secondary text-sm font-mono mb-4">Manage authentication parameters and session states.</p>
          <Button variant="danger" type="button">Terminate Session</Button>
        </Card>
      </motion.div>
    </div>
  );
};
export default ProfilePage;
