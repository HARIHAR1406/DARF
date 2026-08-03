import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../../components/common';

const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      <section className="w-full max-w-6xl mx-auto py-24 md:py-32 px-4 flex flex-col items-center text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Badge variant="primary">v2.0 Intelligent Architecture</Badge>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-heading font-bold tracking-tighter">
            Next-Generation <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-success">AI Interaction</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-mono">
            Experience lightning-fast, highly contextual, and deeply integrated AI conversations designed for peak performance.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" variant="primary">Start Interacting</Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="glass">Read Documentation</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-background-secondary/50 py-24 border-y border-border relative z-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Neural Context', desc: 'Maintains deep session memory for profound continuity in all your interactions.' },
            { title: 'Encrypted Flow', desc: 'Enterprise-grade secure communication pipelines to ensure absolute privacy.' },
            { title: 'Instant Response', desc: 'Sub-millisecond latency powered by state-of-the-art edge architecture.' }
          ].map((feature, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary font-mono text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="w-full max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 className="text-3xl font-heading font-bold mb-6">Ready to elevate your intelligence?</h2>
        <Link to="/register">
          <Button size="lg" variant="primary">Initialize Account</Button>
        </Link>
      </section>
    </div>
  );
};
export default LandingPage;
