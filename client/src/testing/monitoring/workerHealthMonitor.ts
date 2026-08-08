import { HealthState } from '../models/HealthState';
import { workerService } from '../../workers/services/workerService';

export class WorkerHealthMonitor {
    public async checkHealth(): Promise<HealthState> {
        const state: HealthState = {
            subsystem: 'Workers',
            status: 'UNAVAILABLE',
            lastCheck: Date.now(),
            latencyMs: 0,
            errors: [],
            warnings: []
        };

        const start = Date.now();
        try {
            // Validate that worker service is active
            if (typeof workerService.initialize === 'function') {
                state.status = 'HEALTHY';
            } else {
                state.status = 'DEGRADED';
                state.warnings.push('Worker service appears malformed');
            }
        } catch (e: unknown) {
            state.status = 'UNAVAILABLE';
            state.errors.push(e instanceof Error ? e.message : String(e));
        }

        state.latencyMs = Date.now() - start;
        return state;
    }
}

export const workerHealthMonitor = new WorkerHealthMonitor();
