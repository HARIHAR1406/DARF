import { MemoryEntry } from '../../context/models/MemoryEntry';

export class ContextOptimizer {
    public compressContexts(entries: MemoryEntry[]): MemoryEntry[] {
        // Remove redundant entries based on similarity or identical content
        const unique = new Map<string, MemoryEntry>();
        for (const entry of entries) {
            const key = entry.content.trim().toLowerCase();
            const ts = entry.timestamp ?? 0;
            if (!unique.has(key) || ((unique.get(key)!.timestamp ?? 0) < ts)) {
                unique.set(key, entry);
            }
        }
        return Array.from(unique.values());
    }

    public rankContexts(entries: MemoryEntry[]): MemoryEntry[] {
        // Rank by recency and implicit importance
        return [...entries].sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
    }
    
    public pruneContexts(entries: MemoryEntry[], maxTokens: number = 4000): MemoryEntry[] {
        const ranked = this.rankContexts(entries);
        const pruned: MemoryEntry[] = [];
        let currentTokens = 0;
        
        for (const entry of ranked) {
            // Rough approximation: 1 token = 4 chars
            const entryTokens = Math.ceil(entry.content.length / 4);
            if (currentTokens + entryTokens <= maxTokens) {
                pruned.push(entry);
                currentTokens += entryTokens;
            } else {
                break; // Stop adding when limit is reached
            }
        }
        
        return pruned;
    }
}

export const contextOptimizer = new ContextOptimizer();
