import { MemoryEntry } from '../models/MemoryEntry';
import { RetrievalResult } from '../models/RetrievalResult';
import { calculateContextScore } from '../utils/scorer';

export class MemoryRetriever {
    public retrieve(query: string, entries: MemoryEntry[]): RetrievalResult {
        const queryScore = calculateContextScore(query);
        const relevant = entries.filter(e => e.score >= queryScore);
        
        return {
            entries: relevant,
            totalScore: relevant.reduce((acc, val) => acc + val.score, 0)
        };
    }
}
