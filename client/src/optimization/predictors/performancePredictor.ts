export class PerformancePredictor {
    private latencies: number[] = [];
    private readonly windowSize: number = 50;

    public recordLatency(latencyMs: number): void {
        this.latencies.push(latencyMs);
        if (this.latencies.length > this.windowSize) {
            this.latencies.shift();
        }
    }

    public predictDegradationRisk(): number {
        if (this.latencies.length < 10) return 0.0; // Not enough data

        // Compare first half to second half
        const half = Math.floor(this.latencies.length / 2);
        const firstHalf = this.latencies.slice(0, half);
        const secondHalf = this.latencies.slice(half);

        const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

        if (avgFirst === 0) return 0.0;

        const growth = (avgSecond - avgFirst) / avgFirst;
        
        // If latency grew by 50%, risk is high (1.0). If it shrank, risk is 0.
        return Math.max(0.0, Math.min(1.0, growth / 0.5));
    }
}

export const performancePredictor = new PerformancePredictor();
