import { MemoryEntry } from '../models/MemoryEntry';
import { RetrievalResult } from '../models/RetrievalResult';
import { calculateContextScore } from '../utils/scorer';
import { cacheManager } from '../../execution/managers/cacheManager';

export class MemoryRetriever {
    public retrieve(query: string, entries: MemoryEntry[]): RetrievalResult {
        const cacheKey = `ret_${this.hashQuery(query)}`;
        const cachedResult = cacheManager.get<RetrievalResult>(cacheKey);
        
        if (cachedResult) {
            return cachedResult;
        }

        const queryScore = calculateContextScore(query);
        const relevant = entries.filter(e => e.score >= queryScore);
        
        const result = {
            entries: relevant,
            totalScore: relevant.reduce((acc, val) => acc + val.score, 0)
        };
        
        cacheManager.set(cacheKey, result, 60000); // cache result for 60 seconds
        
        return result;
    }
    
    private hashQuery(query: string): string {
        let hash = 0;
        for (let i = 0; i < query.length; i++) {
            const char = query.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    }
}
