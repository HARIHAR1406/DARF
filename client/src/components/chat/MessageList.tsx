import React from 'react';
import { MessageBubble } from './MessageBubble';
import { AIMessage } from '../../ai/types/ai';

interface MessageListProps {
  messages: AIMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex flex-col pb-4">
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id || i} content={msg.content} sender={msg.role} />
      ))}
    </div>
  );
};
