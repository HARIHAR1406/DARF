import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';

type SessionRow = Database['public']['Tables']['sessions']['Row'];
type SessionInsert = Database['public']['Tables']['sessions']['Insert'];
type SessionUpdate = Database['public']['Tables']['sessions']['Update'];

class SessionRepositoryClass extends BaseRepository<SessionRow, SessionInsert, SessionUpdate> {
  constructor() {
    super(TABLES.SESSIONS);
  }
}

export const SessionRepository = new SessionRepositoryClass();
