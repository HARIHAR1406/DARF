import { OptimizationState } from '../models/OptimizationState';

export const validateOptimizationState = (state: unknown): state is OptimizationState => {
    if (!state || typeof state !== 'object') return false;
    
    const obj = state as Partial<OptimizationState>;
    
    return (
        typeof obj.id === 'string' &&
        typeof obj.targetModule === 'string' &&
        typeof obj.cacheHitRatio === 'number' &&
        typeof obj.latencyReduction === 'number' &&
        typeof obj.contextCompressionRatio === 'number' &&
        typeof obj.lastOptimizedAt === 'number' &&
        ['active', 'evaluating', 'idle'].includes(obj.status || '') &&
        typeof obj.metrics === 'object'
    );
};
