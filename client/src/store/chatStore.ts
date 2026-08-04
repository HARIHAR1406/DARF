import { create } from 'zustand';
import { AIMessage } from '../ai/types/ai';

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

    try {
      const { RuntimeIntegration } = await import('../execution/RuntimeIntegration');
      const result = await RuntimeIntegration.executeFullPipeline(content);
      get().updateLastMessage(result);
      set({ isStreaming: false });
    } catch (err: unknown) {
      console.error(err);
      get().updateLastMessage('\n\n**Error:** ' + (err instanceof Error ? err.message : String(err)));
      set({ isStreaming: false });
    }
  }
}));
