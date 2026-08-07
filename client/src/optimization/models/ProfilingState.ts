export interface ProfilingState {
    id: string;
    averageLatencyMs: number;
    peakLatencyMs: number;
    requestsPerSecond: number;
    tokensPerSecond: number;
    errorRate: number;
    lastProfiledAt: number;
    percentiles: {
        p50: number;
        p90: number;
        p95: number;
        p99: number;
    };
}
