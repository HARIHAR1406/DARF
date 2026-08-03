import { SessionRepository } from '../repositories/sessionRepository';
import { Database } from '../types/database';

type SessionInsert = Database['public']['Tables']['sessions']['Insert'];

export const DbSessionService = {
  async createSession(session: SessionInsert) {
    return SessionRepository.create(session);
  },

  async invalidateSession(sessionId: string) {
    return SessionRepository.delete(sessionId);
  }
};
