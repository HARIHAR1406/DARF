import { supabase, executeQuery } from '../config/supabase';
import { TABLES } from '../database/tables';
import { Database } from '../types/database';

type ChatRow = Database['public']['Tables']['chats']['Row'];
type ChatInsert = Database['public']['Tables']['chats']['Insert'];

export const ChatRepository = {
  async getByUserId(userId: string): Promise<ChatRow[] | null> {
    return executeQuery('ChatRepository.getByUserId', () => 
      supabase.from(TABLES.CHATS).select('*').eq('user_id', userId)
    );
  },
  
  async create(chat: ChatInsert): Promise<ChatRow | null> {
    return executeQuery('ChatRepository.create', () => 
      supabase.from(TABLES.CHATS).insert(chat).select().single()
    );
  }
};
