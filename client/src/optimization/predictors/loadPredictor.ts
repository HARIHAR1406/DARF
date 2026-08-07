export class LoadPredictor {
    private recentRequests: number[] = [];
    private readonly windowMs: number = 60000; // 1 minute

    public recordActivity(): void {
        const now = Date.now();
        this.recentRequests.push(now);
        this.prune(now);
    }

    public predictLoadMultiplier(): number {
        const now = Date.now();
        this.prune(now);
        
        // Base load is 1.0. If > 60 req/min, load increases proportionally.
        const reqPerMin = this.recentRequests.length;
        if (reqPerMin < 60) return 1.0;
        
        return reqPerMin / 60;
    }

    private prune(now: number): void {
        const cutoff = now - this.windowMs;
        while (this.recentRequests.length > 0 && this.recentRequests[0] < cutoff) {
            this.recentRequests.shift();
        }
    }
}

export const loadPredictor = new LoadPredictor();
