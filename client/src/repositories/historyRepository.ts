// Preserved for backward compatibility, mapping directly to MessageRepository logic
import { MessageRepository } from './messageRepository';
import { Database } from '../types/database';

type HistoryRow = Database['public']['Tables']['messages']['Row'];
type HistoryInsert = Database['public']['Tables']['messages']['Insert'];

export const HistoryRepository = {
  async getByChatId(chatId: string): Promise<HistoryRow[] | null> {
    return MessageRepository.getByChatId(chatId);
  },
  
  async create(history: HistoryInsert): Promise<HistoryRow | null> {
    return MessageRepository.create(history);
  }
};
