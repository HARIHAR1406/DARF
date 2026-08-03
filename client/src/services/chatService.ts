import { ChatRepository } from '../repositories/chatRepository';
import { Database } from '../types/database';

type ChatInsert = Database['public']['Tables']['chats']['Insert'];

export const ChatService = {
  async fetchUserChats(userId: string) {
    return ChatRepository.getByUserId(userId);
  },
  
  async createNewChat(chat: ChatInsert) {
    return ChatRepository.create(chat);
  }
};
