import { ThreatState, ThreatType } from '../models/ThreatState';

export class ThreatAnalyzer {
    private static threats: ThreatState[] = [];
    
    public static analyzeAccess(role: string, requiredPermission: string): ThreatState | null {
        // Mock analysis - in a real scenario, this would consult authorizationManager
        if (role === 'GUEST' && requiredPermission !== 'READ_KNOWLEDGE') {
            return this.recordThreat('UNAUTHORIZED', 'HIGH', 'Access denied to restricted resource');
        }
        return null;
    }
    
    public static analyzeWorkerActivity(workerName: string, eventCount: number, timeWindowMs: number): ThreatState | null {
        const rate = eventCount / (timeWindowMs / 1000);
        if (rate > 100) { // More than 100 events per second from a single worker is suspicious
            return this.recordThreat('RATE_LIMIT', 'MEDIUM', `Abnormal activity rate detected in worker: ${workerName}`);
        }
        return null;
    }
    
    public static getActiveThreats(): ThreatState[] {
        return this.threats.filter(t => !t.resolved);
    }
    
    private static recordThreat(type: ThreatType, severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', details: string): ThreatState {
        const threat: ThreatState = {
            id: `threat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            type,
            severity,
            source: 'ThreatAnalyzer',
            timestamp: Date.now(),
            resolved: false,
            details
        };
        this.threats.push(threat);
        return threat;
    }
}
