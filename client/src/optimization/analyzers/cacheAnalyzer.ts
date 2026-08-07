export class CacheAnalyzer {
    private hits: number = 0;
    private misses: number = 0;
    private readonly historySize: number = 1000;
    private recentWindow: boolean[] = []; // true for hit, false for miss

    public recordHit(): void {
        this.hits++;
        this.recordToWindow(true);
    }

    public recordMiss(): void {
        this.misses++;
        this.recordToWindow(false);
    }

    public getHitRatio(): number {
        const total = this.hits + this.misses;
        if (total === 0) return 0;
        return this.hits / total;
    }

    public getRecentHitRatio(): number {
        if (this.recentWindow.length === 0) return 0;
        const recentHits = this.recentWindow.filter(isHit => isHit).length;
        return recentHits / this.recentWindow.length;
    }

    public getMissRatio(): number {
        return 1 - this.getHitRatio();
    }

    public reset(): void {
        this.hits = 0;
        this.misses = 0;
        this.recentWindow = [];
    }

    private recordToWindow(isHit: boolean): void {
        this.recentWindow.push(isHit);
        if (this.recentWindow.length > this.historySize) {
            this.recentWindow.shift();
        }
    }
}

export const cacheAnalyzer = new CacheAnalyzer();
