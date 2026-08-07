export class LatencyAnalyzer {
    private latencies: number[] = [];
    private ema: number = 0;
    private readonly alpha: number = 0.2;
    private readonly windowSize: number = 100;

    public recordLatency(latencyMs: number): void {
        this.latencies.push(latencyMs);
        if (this.latencies.length > this.windowSize) {
            this.latencies.shift();
        }
        
        if (this.ema === 0) {
            this.ema = latencyMs;
        } else {
            this.ema = (latencyMs * this.alpha) + (this.ema * (1 - this.alpha));
        }
    }

    public getAverageLatency(): number {
        if (this.latencies.length === 0) return 0;
        return this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
    }

    public getExponentialMovingAverage(): number {
        return this.ema;
    }

    public getPeakLatency(): number {
        if (this.latencies.length === 0) return 0;
        return Math.max(...this.latencies);
    }

    public getPercentile(percentile: number): number {
        if (this.latencies.length === 0) return 0;
        const sorted = [...this.latencies].sort((a, b) => a - b);
        const index = Math.ceil((percentile / 100) * sorted.length) - 1;
        return sorted[Math.max(0, index)];
    }
}

export const latencyAnalyzer = new LatencyAnalyzer();
