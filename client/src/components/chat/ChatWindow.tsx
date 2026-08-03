import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { EmptyState } from './EmptyState';

export const ChatWindow: React.FC = () => {
  const messages: any[] = []; 
  
  return (
    <div className="flex flex-col h-full w-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 py-8">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageList messages={messages} />
        )}
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2 shrink-0 bg-gradient-to-t from-background to-transparent">
        <MessageInput onSend={() => {}} isLoading={false} />
      </div>
    </div>
  );
};
