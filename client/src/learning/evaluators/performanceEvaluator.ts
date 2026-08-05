import { LearningContext } from '../models/LearningState';

export const evaluatePerformance = (context: LearningContext): number => {
    if (!context || context.latencyMs === undefined) return 0.0;
    
    // Target latency 500ms
    const latency = context.latencyMs;
    
    if (latency < 200) return 1.0;
    if (latency > 5000) return 0.1;
    
    // Linear drop off
    const perf = 1.0 - (latency / 6000);
    return Math.max(0, Math.min(1, perf));
};
