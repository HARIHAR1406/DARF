import React from 'react';
import { ChatWindow, ConversationSidebar } from '../../components/chat';

const ChatPage: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden relative">
      <ConversationSidebar />
      <div className="flex-1 min-w-0">
        <ChatWindow />
      </div>
    </div>
  );
};
export default ChatPage;
