import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '../common';
import { motion } from 'framer-motion';
import { useChatStore } from '../../store/chatStore';

export const ConversationSidebar: React.FC = () => {
  const { provider, setProvider, clearChat } = useChatStore();
  const chats: { id: string; title: string }[] = []; // History mocked for now

  return (
    <div className="w-64 border-r border-border bg-background-secondary flex flex-col h-full hidden lg:flex shrink-0">
      <div className="p-4 border-b border-border space-y-4">
        <Button variant="glass" className="w-full flex justify-start items-center" size="sm" onClick={clearChat}>
          <Plus size={16} className="mr-2" />
          New Connection
        </Button>
        <div className="flex justify-between items-center bg-background p-1 rounded border border-border">
          <button 
            onClick={() => setProvider('gemini')}
            className={`flex-1 py-1 px-2 rounded text-xs font-mono transition-colors ${provider === 'gemini' ? 'bg-primary/20 text-primary' : 'text-text-secondary'}`}
          >
            Gemini
          </button>
          <button 
            onClick={() => setProvider('openai')}
            className={`flex-1 py-1 px-2 rounded text-xs font-mono transition-colors ${provider === 'openai' ? 'bg-primary/20 text-primary' : 'text-text-secondary'}`}
          >
            OpenAI
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map((chat) => (
          <motion.button
            key={chat.id}
            whileHover={{ scale: 1.01 }}
            className="w-full text-left px-3 py-2 rounded flex justify-between items-center group hover:bg-background transition-colors text-sm font-mono text-text-secondary hover:text-text-DEFAULT"
          >
            <div className="flex items-center overflow-hidden">
              <MessageSquare size={14} className="mr-2 shrink-0" />
              <span className="truncate">{chat.title}</span>
            </div>
            <Trash2 size={14} className="opacity-0 group-hover:opacity-100 hover:text-danger shrink-0 ml-2 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
