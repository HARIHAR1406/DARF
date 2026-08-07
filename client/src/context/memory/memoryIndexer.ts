import { ContextEntry } from '../models/ContextEntry';
import { cacheManager } from '../../execution/managers/cacheManager';
import { syncManager } from '../../execution/managers/syncManager';

export class MemoryIndexer {
    public indexEntry(entry: ContextEntry): void {
        cacheManager.set(`idx_ctx_${entry.id}`, entry);
        syncManager.queueWrite('memory_index', entry.id, entry);
    }

    public getIndexedEntry(id: string): ContextEntry | undefined {
        const cached = cacheManager.get<ContextEntry>(`idx_ctx_${id}`);
        if (cached) return cached;

        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(`memory_index_${id}`);
            if (raw) {
                const parsed = JSON.parse(raw);
                cacheManager.set(`idx_ctx_${id}`, parsed);
                return parsed;
            }
        }
        return undefined;
    }
}
