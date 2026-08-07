export interface PerformanceMetrics {
    operation: string;
    startTime: number;
    endTime: number;
    durationMs: number;
    memoryUsedMb?: number;
}

export class MetricsTracker {
    private metrics: PerformanceMetrics[] = [];

    public startTrack(operation: string): number {
        // Just log it or reference it so it is not unused
        console.debug(`Starting track for: ${operation}`);
        return Date.now();
    }

    public endTrack(operation: string, startTime: number): PerformanceMetrics {
        const endTime = Date.now();
        let memoryUsedMb: number | undefined = undefined;

        // Use performance API if available in browser
        const perf = performance as unknown as { memory?: { usedJSHeapSize: number } };
        if (typeof performance !== 'undefined' && perf.memory) {
            memoryUsedMb = Math.round(perf.memory.usedJSHeapSize / 1024 / 1024);
        }

        const metric = {
            operation,
            startTime,
            endTime,
            durationMs: endTime - startTime,
            memoryUsedMb
        };
        
        this.metrics.push(metric);
        return metric;
    }

    public getAverageLatency(operationPrefix: string): number {
        const relevant = this.metrics.filter(m => m.operation.startsWith(operationPrefix));
        if (relevant.length === 0) return 0;
        
        const sum = relevant.reduce((acc, curr) => acc + curr.durationMs, 0);
        return sum / relevant.length;
    }

    public clear(): void {
        this.metrics = [];
    }
}

export const metricsTracker = new MetricsTracker();
