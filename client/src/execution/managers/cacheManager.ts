import { syncManager } from './syncManager';

interface CacheEntry<T> {
    data: T;
    expiresAt: number;
    lastAccessed: number;
}

class CacheManager {
    private cache: Map<string, CacheEntry<unknown>> = new Map();
    private readonly maxSize: number = 500;
    private readonly defaultTTL: number = 3600000; // 1 hour

    public set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
        if (this.cache.size >= this.maxSize) {
            this.evictLRU();
        }
        const cacheEntry = {
            data,
            expiresAt: Date.now() + ttl,
            lastAccessed: Date.now()
        };
        this.cache.set(key, cacheEntry);
        
        // Asynchronous write to IndexedDB L2 cache
        syncManager.queueWrite('optimization', `cache_${key}`, cacheEntry);
    }

    public get<T>(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }

        entry.lastAccessed = Date.now();
        return entry.data as T;
    }

    public invalidate(key: string): void {
        this.cache.delete(key);
    }

    public clear(): void {
        this.cache.clear();
    }

    private evictLRU(): void {
        let oldestKey: string | null = null;
        let oldestTime = Infinity;

        for (const [key, entry] of this.cache.entries()) {
            if (entry.lastAccessed < oldestTime) {
                oldestTime = entry.lastAccessed;
                oldestKey = key;
            }
        }

        if (oldestKey) {
            this.cache.delete(oldestKey);
        }
    }
}

export const cacheManager = new CacheManager();
