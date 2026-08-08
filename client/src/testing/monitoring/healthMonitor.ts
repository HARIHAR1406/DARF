import { HealthState } from '../models/HealthState';
import { storageHealthMonitor } from './storageHealthMonitor';
import { workerHealthMonitor } from './workerHealthMonitor';
import { runtimeHealthMonitor } from './runtimeHealthMonitor';

export class HealthMonitor {
    public async checkAllSubsystems(): Promise<HealthState[]> {
        const results = await Promise.all([
            storageHealthMonitor.checkHealth(),
            workerHealthMonitor.checkHealth(),
            runtimeHealthMonitor.checkHealth()
        ]);
        
        return results;
    }

    public isSystemHealthy(states: HealthState[]): boolean {
        return states.every(s => s.status === 'HEALTHY');
    }
}

export const healthMonitor = new HealthMonitor();
