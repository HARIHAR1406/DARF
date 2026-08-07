export type ThreatType = 'INJECTION' | 'XSS' | 'UNAUTHORIZED' | 'RATE_LIMIT' | 'MALFORMED_PAYLOAD';

export interface ThreatState {
    id: string;
    type: ThreatType;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    source: string; // Component or layer origin
    timestamp: number;
    resolved: boolean;
    details: string;
}
