export type RegressionLevel = 'STABLE' | 'IMPROVED' | 'DEGRADED' | 'CRITICAL';

export interface RegressionState {
    operation: string;
    baselineLatencyMs: number | null;
    currentLatencyMs: number;
    shiftPercentage: number;
    level: RegressionLevel;
    newlyFailingTests: string[];
    previouslyFailingTests: string[];
}
