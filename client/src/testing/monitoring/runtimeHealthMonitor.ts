import { HealthState } from '../models/HealthState';
import { RuntimeIntegration } from '../../execution/RuntimeIntegration';

export class RuntimeHealthMonitor {
    public async checkHealth(): Promise<HealthState> {
        const state: HealthState = {
            subsystem: 'Runtime',
            status: 'UNAVAILABLE',
            lastCheck: Date.now(),
            latencyMs: 0,
            errors: [],
            warnings: []
        };

        const start = Date.now();
        try {
            if (typeof RuntimeIntegration.executeFullPipeline === 'function') {
                state.status = 'HEALTHY';
            } else {
                state.status = 'DEGRADED';
                state.warnings.push('Runtime pipeline not detected');
            }
        } catch (e: unknown) {
            state.status = 'UNAVAILABLE';
            state.errors.push(e instanceof Error ? e.message : String(e));
        }

        state.latencyMs = Date.now() - start;
        return state;
    }
}

export const runtimeHealthMonitor = new RuntimeHealthMonitor();
