export interface OptimizationResult {
    success: boolean;
    optimizedPayload?: string;
    cachedResponse?: string;
    latencySavedMs: number;
    tokensSaved: number;
    confidenceScore: number;
    appliedStrategies: string[];
    metadata?: Record<string, string | number>;
}
