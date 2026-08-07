export interface OptimizationState {
    id: string;
    targetModule: string;
    cacheHitRatio: number;
    latencyReduction: number;
    contextCompressionRatio: number;
    lastOptimizedAt: number;
    status: 'active' | 'evaluating' | 'idle';
    metrics: Record<string, number>;
}
