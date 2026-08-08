import { HealthState } from '../models/HealthState';
import { storageService } from '../../storage/services/storageService';

export class StorageHealthMonitor {
    public async checkHealth(): Promise<HealthState> {
        const state: HealthState = {
            subsystem: 'Storage',
            status: 'UNAVAILABLE',
            lastCheck: Date.now(),
            latencyMs: 0,
            errors: [],
            warnings: []
        };

        const start = Date.now();
        try {
            const isInitialized = typeof storageService.initialize === 'function';
            if (isInitialized) {
                state.status = 'HEALTHY';
            } else {
                state.status = 'DEGRADED';
                state.warnings.push('Storage service does not expose initialize method');
            }
        } catch (e: unknown) {
            state.status = 'UNAVAILABLE';
            state.errors.push(e instanceof Error ? e.message : String(e));
        }

        state.latencyMs = Date.now() - start;
        return state;
    }
}

export const storageHealthMonitor = new StorageHealthMonitor();
