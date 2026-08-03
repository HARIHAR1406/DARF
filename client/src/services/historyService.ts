import { HistoryRepository } from '../repositories/historyRepository';
import { Database } from '../types/database';

type HistoryInsert = Database['public']['Tables']['history']['Insert'];

export const HistoryService = {
  async fetchChatHistory(chatId: string) {
    return HistoryRepository.getByChatId(chatId);
  },
  
  async addMessageToHistory(history: HistoryInsert) {
    return HistoryRepository.create(history);
  }
};
