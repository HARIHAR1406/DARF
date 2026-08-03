import { MessageRepository } from '../repositories/messageRepository';
import { Database } from '../types/database';

type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export const MessageService = {
  async fetchMessages(chatId: string) {
    return MessageRepository.getByChatId(chatId);
  },
  
  async sendMessage(message: MessageInsert) {
    return MessageRepository.create(message);
  }
};
