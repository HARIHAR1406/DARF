import React from 'react';
import { motion } from 'framer-motion';
import { Card, Divider } from '../../components/common';

const DocsPage: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 space-y-2">
          <h4 className="font-heading font-semibold mb-4 text-text-secondary uppercase tracking-wider text-sm">Navigation</h4>
          {['Introduction', 'Getting Started', 'Authentication', 'Usage', 'Support'].map(item => (
            <div key={item} className="font-mono text-sm text-text-secondary hover:text-primary cursor-pointer transition-colors py-1">
              {item}
            </div>
          ))}
        </div>
      </aside>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-12 max-w-3xl">
        <section>
          <h1 className="text-4xl font-heading font-bold mb-4">Documentation</h1>
          <p className="text-text-secondary font-mono leading-relaxed">
            Welcome to the official documentation for the DARF intelligent platform. Learn how to integrate, interact, and maximize your productivity.
          </p>
        </section>
        
        <Divider />
        
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4 text-primary">Getting Started</h2>
          <Card glass={false}>
            <p className="text-sm font-mono text-text-secondary mb-4">
              Begin by creating an account. Navigate to the registration portal and establish your credentials.
            </p>
            <pre className="p-4 bg-background border border-border rounded text-sm overflow-x-auto text-success">
              <code>{'$ npm install @darf/sdk'}</code>
            </pre>
          </Card>
        </section>
      </motion.div>
    </div>
  );
};
export default DocsPage;
