import { AuthSession } from '../types';

export const SessionManager = {
  persist: (session: AuthSession) => {
    localStorage.setItem('darf_session', JSON.stringify(session));
  },
  restore: (): AuthSession | null => {
    const data = localStorage.getItem('darf_session');
    return data ? JSON.parse(data) : null;
  },
  clear: () => {
    localStorage.removeItem('darf_session');
  },
  isExpired: (session: AuthSession) => {
    return Date.now() >= session.expiresAt;
  }
};
