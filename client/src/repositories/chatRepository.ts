import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';
import { supabase, executeQuery } from '../config/supabase';

type ChatRow = Database['public']['Tables']['chats']['Row'];
type ChatInsert = Database['public']['Tables']['chats']['Insert'];
type ChatUpdate = Database['public']['Tables']['chats']['Update'];

class ChatRepositoryClass extends BaseRepository<ChatRow, ChatInsert, ChatUpdate> {
  constructor() {
    super(TABLES.CHATS);
  }
  
  async getByUserId(userId: string): Promise<ChatRow[]> {
    const res = await executeQuery('ChatRepository.getByUserId', () =>
      supabase.from(this.tableName).select('*').eq('user_id', userId).order('created_at', { ascending: false })
    );
    return (res as ChatRow[]) || [];
  }
}

export const ChatRepository = new ChatRepositoryClass();
