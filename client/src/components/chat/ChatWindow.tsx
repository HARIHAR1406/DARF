import React, { useRef, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { EmptyState } from './EmptyState';
import { useChatStore } from '../../store/chatStore';

export const ChatWindow: React.FC = () => {
  const { messages, sendMessage, isStreaming } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 py-8 pb-32">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageList messages={messages} />
        )}
        <div ref={bottomRef} />
      </div>
      <div className="absolute bottom-0 w-full glass border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <MessageInput onSend={sendMessage} isLoading={isStreaming} />
        </div>
      </div>
    </div>
  );
};
