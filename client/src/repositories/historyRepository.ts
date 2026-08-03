import { supabase, executeQuery } from '../config/supabase';
import { TABLES } from '../database/tables';
import { Database } from '../types/database';

type HistoryRow = Database['public']['Tables']['history']['Row'];
type HistoryInsert = Database['public']['Tables']['history']['Insert'];

export const HistoryRepository = {
  async getByChatId(chatId: string): Promise<HistoryRow[] | null> {
    return executeQuery('HistoryRepository.getByChatId', () => 
      supabase.from(TABLES.HISTORY).select('*').eq('chat_id', chatId)
    );
  },
  
  async create(history: HistoryInsert): Promise<HistoryRow | null> {
    return executeQuery('HistoryRepository.create', () => 
      supabase.from(TABLES.HISTORY).insert(history).select().single()
    );
  }
};
