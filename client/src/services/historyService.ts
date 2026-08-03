// Preserved for backward compatibility
import { MessageService } from './messageService';
import { Database } from '../types/database';

type HistoryInsert = Database['public']['Tables']['messages']['Insert'];

export const HistoryService = {
  async fetchChatHistory(chatId: string) {
    return MessageService.fetchMessages(chatId);
  },
  
  async addMessageToHistory(history: HistoryInsert) {
    return MessageService.sendMessage(history);
  }
};
