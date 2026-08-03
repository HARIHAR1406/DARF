import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/common';

const FeaturesPage: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center mb-16">
        <h1 className="text-4xl font-heading font-bold mb-4">Platform Features</h1>
        <p className="text-text-secondary font-mono">Discover the capabilities of our intelligent architecture.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'AI Conversations', desc: 'Engage with a cutting-edge language model for creative and technical tasks.' },
          { title: 'Real-time Interaction', desc: 'Streamed responses ensuring seamless workflow and efficiency.' },
          { title: 'Secure Authentication', desc: 'Multi-layered protection keeping your data strictly confidential.' },
          { title: 'Intelligent History', desc: 'Effortlessly search and filter through past dialogues instantly.' },
          { title: 'Analytics', desc: 'Monitor your usage and interaction patterns over time with detailed metrics.' }
        ].map((feat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.1 }}>
            <Card className="h-full hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-heading font-semibold text-primary mb-2">{feat.title}</h3>
              <p className="text-text-secondary font-mono text-sm">{feat.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default FeaturesPage;
