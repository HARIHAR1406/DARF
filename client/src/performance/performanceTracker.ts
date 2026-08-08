export interface PerformanceMetric {
    operation: string;
    latencyMs: number;
    timestamp: number;
    memoryUsageMB?: number;
}

class PerformanceTracker {
    private metrics: PerformanceMetric[] = [];
    private readonly maxMetrics = 1000;

    public track(operation: string, latencyMs: number): void {
        let memoryUsageMB: number | undefined;
        
        // Non-standard performance API in some browsers (Chrome/Edge)
        // Ensure no Node.js APIs leak here.
        interface ExtendedPerformance extends Performance {
            memory?: { usedJSHeapSize: number };
        }
        const extPerf = performance as ExtendedPerformance;
        if (typeof extPerf !== 'undefined' && extPerf.memory) {
            memoryUsageMB = extPerf.memory.usedJSHeapSize / (1024 * 1024);
        }

        this.metrics.push({
            operation,
            latencyMs,
            timestamp: Date.now(),
            memoryUsageMB
        });

        if (this.metrics.length > this.maxMetrics) {
            this.metrics.shift();
        }
    }

    public getAverageLatency(operation: string): number {
        const ops = this.metrics.filter(m => m.operation === operation);
        if (ops.length === 0) return 0;
        const sum = ops.reduce((acc, m) => acc + m.latencyMs, 0);
        return sum / ops.length;
    }

    public getMetrics(): PerformanceMetric[] {
        return [...this.metrics];
    }
    
    public clear(): void {
        this.metrics = [];
    }
}

export const performanceTracker = new PerformanceTracker();
