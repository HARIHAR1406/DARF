import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';
import { supabase, executeQuery } from '../config/supabase';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

class ProfileRepositoryClass extends BaseRepository<ProfileRow, ProfileInsert, ProfileUpdate> {
  constructor() {
    super(TABLES.PROFILES);
  }
  
  async getByUserId(userId: string): Promise<ProfileRow | null> {
    return executeQuery('ProfileRepository.getByUserId', () =>
      supabase.from(this.tableName).select('*').eq('user_id', userId).single()
    );
  }
}

export const ProfileRepository = new ProfileRepositoryClass();
