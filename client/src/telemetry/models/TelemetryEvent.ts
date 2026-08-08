export type TelemetryCategory = 'RUNTIME' | 'WORKER' | 'STORAGE' | 'SECURITY' | 'TESTING' | 'PERFORMANCE' | 'KNOWLEDGE' | 'LEARNING' | 'OPTIMIZATION';
export type TelemetrySeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
export type TelemetryStatus = 'SUCCESS' | 'FAILURE' | 'PENDING' | 'UNKNOWN';

export interface TelemetryEvent {
    eventId: string;
    timestamp: number;
    category: TelemetryCategory;
    source: string;
    operation: string;
    durationMs?: number;
    status: TelemetryStatus;
    severity: TelemetrySeverity;
    metadata?: Record<string, string | number | boolean>; // Must be sanitized
}
