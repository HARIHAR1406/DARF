import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Avatar } from '../common';
import { Copy, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AIMessage } from '../../ai/types/ai';

interface MessageBubbleProps {
  content: string;
  sender: AIMessage['role'];
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
      <div className={clsx("flex max-w-[85%] gap-4", isUser ? "flex-row-reverse" : "flex-row")}>
        <Avatar alt={sender} size="sm" />
        <div className="flex flex-col gap-2 group min-w-0">
          <div 
            className={clsx(
              "p-4 rounded-xl shadow-sm text-sm break-words font-body prose prose-invert max-w-none prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border overflow-hidden",
              isUser ? "bg-primary text-background rounded-tr-none prose-p:text-background" : "bg-background-secondary border border-border text-text-DEFAULT rounded-tl-none"
            )}
          >
            {isUser ? content : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || '...'}
              </ReactMarkdown>
            )}
          </div>
          {!isUser && (
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              <button 
                onClick={() => navigator.clipboard.writeText(content)}
                className="text-text-secondary hover:text-text-DEFAULT p-1 transition-colors"
                title="Copy text"
              >
                <Copy size={14} />
              </button>
              <button className="text-text-secondary hover:text-text-DEFAULT p-1 transition-colors" title="Regenerate">
                <RefreshCw size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
