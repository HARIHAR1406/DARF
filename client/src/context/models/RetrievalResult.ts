import { MemoryEntry } from './MemoryEntry';

export interface RetrievalResult {
    entries: MemoryEntry[];
    totalScore: number;
}
