export class FailurePredictor {
    private failureHistory: Map<string, number[]> = new Map();
    private readonly windowMs: number = 300000; // 5 minutes

    public recordFailure(provider: string): void {
        const history = this.failureHistory.get(provider) || [];
        history.push(Date.now());
        this.failureHistory.set(provider, history);
        this.prune(provider);
    }

    public recordSuccess(provider: string): void {
        // We do not erase failures, but time naturally prunes them.
        this.prune(provider);
    }

    public predictFailureProbability(provider: string): number {
        this.prune(provider);
        const history = this.failureHistory.get(provider) || [];
        
        // If 5 failures in 5 minutes, 100% probability
        const probability = Math.min(1.0, history.length / 5);
        return probability;
    }

    private prune(provider: string): void {
        const history = this.failureHistory.get(provider) || [];
        const cutoff = Date.now() - this.windowMs;
        const pruned = history.filter(time => time >= cutoff);
        this.failureHistory.set(provider, pruned);
    }
}

export const failurePredictor = new FailurePredictor();
