import { ContextEntry } from '../models/ContextEntry';

export class MemoryIndexer {
    private index: Map<string, ContextEntry> = new Map();

    public indexEntry(entry: ContextEntry): void {
        this.index.set(entry.id, entry);
    }

    public getIndexedEntry(id: string): ContextEntry | undefined {
        return this.index.get(id);
    }
}
