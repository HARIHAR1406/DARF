import { create } from 'zustand';

interface ChatState {
  // TODO: Define chat state
  messages: any[];
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  // TODO: Add chat actions
}));
