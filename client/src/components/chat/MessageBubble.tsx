import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Avatar } from '../common';

interface MessageBubbleProps {
  content: string;
  sender: 'user' | 'ai' | 'system';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, sender }) => {
  const isUser = sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}
    >
      <div className={clsx("flex max-w-[80%] gap-4", isUser ? "flex-row-reverse" : "flex-row")}>
        <Avatar alt={sender} size="sm" />
        <div 
          className={clsx(
            "p-4 rounded-xl shadow-sm text-sm whitespace-pre-wrap break-words font-body",
            isUser ? "bg-primary text-background rounded-tr-none" : "bg-background-secondary border border-border text-text-DEFAULT rounded-tl-none"
          )}
        >
          {content}
        </div>
      </div>
    </motion.div>
  );
};
