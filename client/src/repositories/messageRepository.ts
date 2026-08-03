import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';
import { supabase, executeQuery } from '../config/supabase';

type MessageRow = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];
type MessageUpdate = Database['public']['Tables']['messages']['Update'];

class MessageRepositoryClass extends BaseRepository<MessageRow, MessageInsert, MessageUpdate> {
  constructor() {
    super(TABLES.MESSAGES);
  }
  
  async getByChatId(chatId: string): Promise<MessageRow[]> {
    const res = await executeQuery('MessageRepository.getByChatId', () =>
      supabase.from(this.tableName).select('*').eq('chat_id', chatId).order('created_at', { ascending: true })
    );
    return (res as MessageRow[]) || [];
  }
}

export const MessageRepository = new MessageRepositoryClass();
