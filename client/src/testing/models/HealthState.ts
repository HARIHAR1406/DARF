export type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE';

export interface HealthState {
    subsystem: string;
    status: HealthStatus;
    lastCheck: number;
    latencyMs: number;
    errors: string[];
    warnings: string[];
}
