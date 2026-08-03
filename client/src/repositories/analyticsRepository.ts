import { BaseRepository } from './baseRepository';
import { Database } from '../types/database';
import { TABLES } from '../database/tables';

type AnalyticsRow = Database['public']['Tables']['analytics']['Row'];
type AnalyticsInsert = Database['public']['Tables']['analytics']['Insert'];
type AnalyticsUpdate = Database['public']['Tables']['analytics']['Update'];

class AnalyticsRepositoryClass extends BaseRepository<AnalyticsRow, AnalyticsInsert, AnalyticsUpdate> {
  constructor() {
    super(TABLES.ANALYTICS);
  }
}

export const AnalyticsRepository = new AnalyticsRepositoryClass();
