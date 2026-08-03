import { create } from 'zustand';
import { AIMessage } from '../ai/types/ai';
import { providers } from '../ai/providers';
import { ContextManager } from '../ai/managers/contextManager';

interface ChatState {
  messages: AIMessage[];
  isStreaming: boolean;
  provider: string;
  addMessage: (msg: AIMessage) => void;
  setProvider: (provider: string) => void;
  sendMessage: (content: string) => Promise<void>;
  updateLastMessage: (content: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isStreaming: false,
  provider: 'gemini',
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setProvider: (provider) => set({ provider }),
  clearChat: () => set({ messages: [] }),
  updateLastMessage: (content) => set((state) => {
    const newMessages = [...state.messages];
    const last = newMessages[newMessages.length - 1];
    if (last && last.role === 'model') {
      last.content += content;
    }
    return { messages: newMessages };
  }),
  sendMessage: async (content: string) => {
    const userMsg: AIMessage = { id: crypto.randomUUID(), role: 'user', content, timestamp: Date.now() };
    set((state) => ({ messages: [...state.messages, userMsg], isStreaming: true }));
    
    const aiMsg: AIMessage = { id: crypto.randomUUID(), role: 'model', content: '', timestamp: Date.now() };
    set((state) => ({ messages: [...state.messages, aiMsg] }));

    const { messages, provider } = get();
    const context = ContextManager.buildContext(messages.slice(0, -1)); // exclude the empty aiMsg
    const selectedProvider = providers[provider];

    if (!selectedProvider) {
      console.error('Provider not found');
      set({ isStreaming: false });
      return;
    }

    try {
      await selectedProvider.streamText(context, (chunk) => {
        if (!chunk.isFinished) {
          get().updateLastMessage(chunk.text);
        } else {
          set({ isStreaming: false });
        }
      });
    } catch (err: unknown) {
      console.error(err);
      get().updateLastMessage('\n\n**Error:** ' + (err instanceof Error ? err.message : String(err)));
      set({ isStreaming: false });
    }
  }
}));
