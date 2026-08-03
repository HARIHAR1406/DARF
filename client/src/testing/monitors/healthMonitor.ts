import { HealthStatus } from '../models/HealthStatus';
export const monitorHealth = (): HealthStatus => ({ status: 'OK', timestamp: new Date().toISOString() });
