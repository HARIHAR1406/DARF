import { MemoryEntry } from '../models/MemoryEntry';

export class MemoryManager {
    private memories: Map<string, MemoryEntry> = new Map();

    public createMemory(entry: MemoryEntry): void {
        this.memories.set(entry.id, entry);
    }

    public updateMemory(id: string, entry: Partial<MemoryEntry>): void {
        const existing = this.memories.get(id);
        if (existing) {
            this.memories.set(id, { ...existing, ...entry });
        }
    }

    public deleteMemory(id: string): void {
        this.memories.delete(id);
    }

    public retrieveMemory(id: string): MemoryEntry | undefined {
        return this.memories.get(id);
    }
}
