import { ProfilingState } from '../models/ProfilingState';
import { PredictionState } from '../models/PredictionState';

export const validateProfilingState = (state: unknown): state is ProfilingState => {
    if (!state || typeof state !== 'object') return false;
    
    const obj = state as Partial<ProfilingState>;
    
    return (
        typeof obj.id === 'string' &&
        typeof obj.averageLatencyMs === 'number' &&
        typeof obj.peakLatencyMs === 'number' &&
        typeof obj.requestsPerSecond === 'number' &&
        typeof obj.tokensPerSecond === 'number' &&
        typeof obj.errorRate === 'number' &&
        typeof obj.lastProfiledAt === 'number' &&
        typeof obj.percentiles === 'object' &&
        obj.percentiles !== null
    );
};

export const validatePredictionState = (state: unknown): state is PredictionState => {
    if (!state || typeof state !== 'object') return false;
    
    const obj = state as Partial<PredictionState>;
    
    return (
        typeof obj.id === 'string' &&
        typeof obj.predictedRoute === 'string' &&
        typeof obj.failureProbability === 'number' &&
        typeof obj.loadPrediction === 'number' &&
        typeof obj.performanceDegradationRisk === 'number' &&
        typeof obj.confidence === 'number' &&
        typeof obj.predictedAt === 'number' &&
        typeof obj.validUntil === 'number'
    );
};
