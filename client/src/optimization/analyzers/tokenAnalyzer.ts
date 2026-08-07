export class TokenAnalyzer {
    private tokenRecords: { timestamp: number; count: number }[] = [];
    private readonly windowMs: number = 60000;

    public recordTokens(count: number): void {
        const now = Date.now();
        this.tokenRecords.push({ timestamp: now, count });
        this.prune(now);
    }

    public getTokensPerSecond(): number {
        const now = Date.now();
        this.prune(now);
        
        if (this.tokenRecords.length === 0) return 0;
        const totalTokens = this.tokenRecords.reduce((sum, record) => sum + record.count, 0);
        return totalTokens / (this.windowMs / 1000);
    }

    public getTotalTokensInWindow(): number {
        const now = Date.now();
        this.prune(now);
        return this.tokenRecords.reduce((sum, record) => sum + record.count, 0);
    }

    private prune(now: number): void {
        const cutoff = now - this.windowMs;
        while (this.tokenRecords.length > 0 && this.tokenRecords[0].timestamp < cutoff) {
            this.tokenRecords.shift();
        }
    }
}

export const tokenAnalyzer = new TokenAnalyzer();
