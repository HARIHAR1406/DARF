export type SecurityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SecurityState {
    sessionId: string;
    level: SecurityLevel;
    timestamp: number;
    activeThreats: number;
    blockedRequests: number;
    isAuthenticated: boolean;
    permissions: string[];
}
