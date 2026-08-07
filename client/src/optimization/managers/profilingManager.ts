import { latencyAnalyzer } from '../analyzers/latencyAnalyzer';
import { throughputAnalyzer } from '../analyzers/throughputAnalyzer';
import { tokenAnalyzer } from '../analyzers/tokenAnalyzer';
import { cacheAnalyzer } from '../analyzers/cacheAnalyzer';
import { ProfilingState } from '../models/ProfilingState';

export class ProfilingManager {
    public getGlobalProfile(): ProfilingState {
        return {
            id: `prof-${Date.now()}`,
            averageLatencyMs: latencyAnalyzer.getAverageLatency(),
            peakLatencyMs: latencyAnalyzer.getPeakLatency(),
            requestsPerSecond: throughputAnalyzer.getRequestsPerSecond(),
            tokensPerSecond: tokenAnalyzer.getTokensPerSecond(),
            errorRate: cacheAnalyzer.getMissRatio(), // Simplification for now
            lastProfiledAt: Date.now(),
            percentiles: {
                p50: latencyAnalyzer.getPercentile(50),
                p90: latencyAnalyzer.getPercentile(90),
                p95: latencyAnalyzer.getPercentile(95),
                p99: latencyAnalyzer.getPercentile(99)
            }
        };
    }
}

export const profilingManager = new ProfilingManager();
