export class ThroughputAnalyzer {
    private requests: number[] = [];
    private readonly windowMs: number = 60000; // 1 minute window

    public recordRequest(): void {
        const now = Date.now();
        this.requests.push(now);
        this.prune(now);
    }

    public getRequestsPerSecond(): number {
        const now = Date.now();
        this.prune(now);
        
        if (this.requests.length === 0) return 0;
        return this.requests.length / (this.windowMs / 1000);
    }

    private prune(now: number): void {
        const cutoff = now - this.windowMs;
        while (this.requests.length > 0 && this.requests[0] < cutoff) {
            this.requests.shift();
        }
    }
}

export const throughputAnalyzer = new ThroughputAnalyzer();
