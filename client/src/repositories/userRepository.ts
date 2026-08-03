import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';
import { supabase, executeQuery } from '../config/supabase';

type UserRow = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

class UserRepositoryClass extends BaseRepository<UserRow, UserInsert, UserUpdate> {
  constructor() {
    super(TABLES.USERS);
  }
  
  async getByFirebaseUid(uid: string): Promise<UserRow | null> {
    return executeQuery('UserRepository.getByFirebaseUid', () =>
      supabase.from(this.tableName).select('*').eq('firebase_uid', uid).single()
    );
  }
}

export const UserRepository = new UserRepositoryClass();
