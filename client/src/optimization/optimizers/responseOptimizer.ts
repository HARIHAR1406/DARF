import { ProviderResponse } from '../../provider/models/ProviderResponse';
import { cacheAnalyzer } from '../analyzers/cacheAnalyzer';

export class ResponseOptimizer {
    private responseCache: Map<string, { response: ProviderResponse, expiresAt: number }> = new Map();
    private readonly ttlMs: number = 60000;

    public cacheResponse(key: string, response: ProviderResponse): void {
        this.responseCache.set(key, {
            response,
            expiresAt: Date.now() + this.ttlMs
        });
    }

    public getCachedResponse(key: string): ProviderResponse | null {
        const cached = this.responseCache.get(key);
        if (!cached) {
            cacheAnalyzer.recordMiss();
            return null;
        }

        if (Date.now() > cached.expiresAt) {
            this.responseCache.delete(key);
            cacheAnalyzer.recordMiss();
            return null;
        }

        cacheAnalyzer.recordHit();
        return cached.response;
    }

    public deduplicateResponses(responses: ProviderResponse[]): ProviderResponse[] {
        const unique = new Map<string, ProviderResponse>();
        for (const res of responses) {
            if (!unique.has(res.data)) {
                unique.set(res.data, res);
            }
        }
        return Array.from(unique.values());
    }
}

export const responseOptimizer = new ResponseOptimizer();
