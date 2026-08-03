export class CacheProvider {
    private cache: Map<string, { value: string; expires: number }> = new Map();

    public set(key: string, value: string, ttlMs: number): void {
        this.cache.set(key, { value, expires: Date.now() + ttlMs });
    }

    public get(key: string): string | null {
        const entry = this.cache.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
}
