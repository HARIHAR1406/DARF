import { MemoryEntry } from '../models/MemoryEntry';

export class MemoryCompressor {
    public compress(entries: MemoryEntry[]): MemoryEntry[] {
        // Token compression and duplicate detection logic
        const unique = new Map<string, MemoryEntry>();
        
        entries.forEach(entry => {
            const hash = this.hashContent(entry.content);
            if (!unique.has(hash)) {
                // Keep the most recent version if duplicate content exists
                unique.set(hash, entry);
            } else {
                const existing = unique.get(hash);
                if (existing && (entry as unknown as Record<string, number>).timestamp > (existing as unknown as Record<string, number>).timestamp) {
                    unique.set(hash, entry);
                }
            }
        });
        
        return Array.from(unique.values());
    }
    
    private hashContent(content: string): string {
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    }
}
