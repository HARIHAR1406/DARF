import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../common';

interface MessageInputProps {
  onSend: (msg: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSend} className="relative w-full">
      <div className="glass rounded-xl border border-border p-2 flex items-end shadow-lg focus-within:border-primary transition-colors">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Transmit message..."
          className="w-full bg-transparent p-2 outline-none resize-none text-text-DEFAULT font-mono text-sm min-h-[44px] max-h-48"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button 
          type="submit" 
          disabled={!text.trim() || isLoading} 
          variant="primary"
          size="sm"
          className="mb-1 ml-2 shrink-0 rounded-lg p-2"
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  );
};
