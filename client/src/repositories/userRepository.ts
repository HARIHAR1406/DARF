import { supabase, executeQuery } from '../config/supabase';
import { TABLES } from '../database/tables';
import { Database } from '../types/database';

type UserRow = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];

export const UserRepository = {
  async getById(id: string): Promise<UserRow | null> {
    return executeQuery('UserRepository.getById', () => 
      supabase.from(TABLES.USERS).select('*').eq('id', id).single()
    );
  },
  
  async create(user: UserInsert): Promise<UserRow | null> {
    return executeQuery('UserRepository.create', () => 
      supabase.from(TABLES.USERS).insert(user).select().single()
    );
  }
};
