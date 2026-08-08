import { databaseManager } from '../../storage/database/databaseManager';
import { TelemetryEvent } from '../models/TelemetryEvent';
import { HealthState } from '../../testing/models/HealthState';

export class HealthAggregator {
    
    public async aggregateHealth(): Promise<HealthState[]> {
        const states: HealthState[] = [];
        const now = Date.now();
        
        try {
            // Retrieve recent telemetry to assess health
            const recentEvents = await databaseManager.getAll<TelemetryEvent>('telemetry');
            
            // Subsystems
            states.push(this.evaluateSubsystem('Runtime', 'RUNTIME', recentEvents, now));
            states.push(this.evaluateSubsystem('Storage', 'STORAGE', recentEvents, now));
            states.push(this.evaluateSubsystem('Workers', 'WORKER', recentEvents, now));
            states.push(this.evaluateSubsystem('Security', 'SECURITY', recentEvents, now));
            states.push(this.evaluateSubsystem('Performance', 'PERFORMANCE', recentEvents, now));
            
        } catch (e) {
            console.error('Failed to aggregate health', e);
        }
        
        return states;
    }

    private evaluateSubsystem(name: string, category: string, events: TelemetryEvent[], now: number): HealthState {
        const subsystemEvents = events.filter(e => e.category === category);
        const errors = subsystemEvents.filter(e => e.severity === 'ERROR' || e.severity === 'CRITICAL');
        const warnings = subsystemEvents.filter(e => e.severity === 'WARNING');
        
        let status: 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE' = 'HEALTHY';
        
        if (errors.length > 5) {
            status = 'UNAVAILABLE';
        } else if (errors.length > 0 || warnings.length > 10) {
            status = 'DEGRADED';
        }
        
        if (subsystemEvents.length === 0 && name !== 'Security') {
            status = 'UNAVAILABLE'; // If no telemetry, assume unavailable, except security which might be quiet
        }
        
        // Calculate average latency if available
        let avgLatency = 0;
        const latencyEvents = subsystemEvents.filter(e => e.durationMs !== undefined);
        if (latencyEvents.length > 0) {
            avgLatency = latencyEvents.reduce((sum, e) => sum + (e.durationMs || 0), 0) / latencyEvents.length;
        }

        return {
            subsystem: name,
            status,
            lastCheck: now,
            latencyMs: avgLatency,
            errors: errors.map(e => e.operation),
            warnings: warnings.map(e => e.operation)
        };
    }
}

export const healthAggregator = new HealthAggregator();
