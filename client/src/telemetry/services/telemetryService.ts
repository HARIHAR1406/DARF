import { TelemetryEvent, TelemetryCategory, TelemetrySeverity, TelemetryStatus } from '../models/TelemetryEvent';
import { syncManager } from '../../execution/managers/syncManager';

export class TelemetryService {
    private isEnabled = true;

    // Track a generic event
    public trackEvent(
        category: TelemetryCategory,
        source: string,
        operation: string,
        status: TelemetryStatus = 'SUCCESS',
        severity: TelemetrySeverity = 'INFO',
        durationMs?: number,
        metadata?: Record<string, string | number | boolean>
    ): void {
        if (!this.isEnabled) return;
        
        try {
            const event: TelemetryEvent = {
                eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                timestamp: Date.now(),
                category,
                source,
                operation,
                durationMs,
                status,
                severity,
                metadata
            };
            
            // Queue for background write to IndexedDB 'telemetry' store
            syncManager.queueWrite('telemetry', event.eventId, event);
        } catch (e) {
            // Failure isolation: Telemetry must never crash the main pipeline
            console.warn('Telemetry tracking failed, ignoring error:', e);
        }
    }

    public trackPerformance(source: string, operation: string, durationMs: number): void {
        this.trackEvent('PERFORMANCE', source, operation, 'SUCCESS', 'INFO', durationMs);
    }

    public trackError(category: TelemetryCategory, source: string, operation: string, error: unknown): void {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) errorMessage = error.message;
        else if (typeof error === 'string') errorMessage = error;

        this.trackEvent(category, source, operation, 'FAILURE', 'ERROR', undefined, { error: errorMessage });
    }

    public disableTelemetry(): void {
        this.isEnabled = false;
    }
}

export const telemetryService = new TelemetryService();
