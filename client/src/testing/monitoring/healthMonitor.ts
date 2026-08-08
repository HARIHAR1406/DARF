import { HealthState } from '../models/HealthState';
import { healthAggregator } from '../../telemetry/aggregators/healthAggregator';

export class HealthMonitor {
    public async checkAllSubsystems(): Promise<HealthState[]> {
        return healthAggregator.aggregateHealth();
    }

    public isSystemHealthy(states: HealthState[]): boolean {
        return states.every(s => s.status === 'HEALTHY');
    }
}

export const healthMonitor = new HealthMonitor();
