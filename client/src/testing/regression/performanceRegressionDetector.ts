import { RegressionState, RegressionLevel } from '../models/RegressionState';
import { metricsTracker } from '../performance/metricsTracker';

export class PerformanceRegressionDetector {
    private readonly DEGRADED_THRESHOLD_PCT = 20; // 20% slower
    private readonly CRITICAL_THRESHOLD_PCT = 50; // 50% slower
    
    // In a real DB we would fetch these. For DARF's zero-dependency simulated baseline, we hardcode mock baselines.
    private baselines: Record<string, number> = {
        'bench:latency:sync': 15,
        'bench:worker:throughput': 45
    };

    public detect(): RegressionState[] {
        const regressions: RegressionState[] = [];
        
        // We need to expose getMetrics() or just fetch averages from the tracker
        const operations = Object.keys(this.baselines);
        
        operations.forEach(op => {
            const currentLatencyMs = metricsTracker.getAverageLatency(op);
            if (currentLatencyMs > 0) {
                const baselineLatencyMs = this.baselines[op];
                let shiftPercentage = 0;
                let level: RegressionLevel = 'STABLE';

                if (baselineLatencyMs) {
                    shiftPercentage = ((currentLatencyMs - baselineLatencyMs) / baselineLatencyMs) * 100;

                    if (shiftPercentage >= this.CRITICAL_THRESHOLD_PCT) {
                        level = 'CRITICAL';
                    } else if (shiftPercentage >= this.DEGRADED_THRESHOLD_PCT) {
                        level = 'DEGRADED';
                    } else if (shiftPercentage < -10) { // 10% faster is improved
                        level = 'IMPROVED';
                    }
                }

                regressions.push({
                    operation: op,
                    baselineLatencyMs: baselineLatencyMs || null,
                    currentLatencyMs,
                    shiftPercentage,
                    level,
                    newlyFailingTests: [],
                    previouslyFailingTests: []
                });
            }
        });

        return regressions;
    }
}

export const performanceRegressionDetector = new PerformanceRegressionDetector();
