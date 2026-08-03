import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';

type LogRow = Database['public']['Tables']['logs']['Row'];
type LogInsert = Database['public']['Tables']['logs']['Insert'];
type LogUpdate = Database['public']['Tables']['logs']['Update'];

class LogRepositoryClass extends BaseRepository<LogRow, LogInsert, LogUpdate> {
  constructor() {
    super(TABLES.LOGS);
  }
}

export const LogRepository = new LogRepositoryClass();
