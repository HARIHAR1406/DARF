export type Role = 'USER' | 'ADMIN' | 'SYSTEM';
export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'execute';
}
export interface AuthSession {
  token: string;
  expiresAt: number;
  refreshToken: string;
}
