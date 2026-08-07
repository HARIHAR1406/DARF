import { MemoryEntry } from '../models/MemoryEntry';
import { cacheManager } from '../../execution/managers/cacheManager';
import { syncManager } from '../../execution/managers/syncManager';

export class MemoryManager {
    public createMemory(entry: MemoryEntry): void {
        cacheManager.set(`mem_${entry.id}`, entry);
        syncManager.queueWrite('memory', `entry_${entry.id}`, entry);
    }

    public updateMemory(id: string, entry: Partial<MemoryEntry>): void {
        const existing = this.retrieveMemory(id);
        if (existing) {
            const updated = { ...existing, ...entry };
            cacheManager.set(`mem_${id}`, updated);
            syncManager.queueWrite('memory', `entry_${id}`, updated);
        }
    }

    public deleteMemory(id: string): void {
        cacheManager.invalidate(`mem_${id}`);
        syncManager.queueWrite('memory', `entry_${id}`, null); // Tombstone for sync
    }

    public retrieveMemory(id: string): MemoryEntry | undefined {
        const mem = cacheManager.get<MemoryEntry>(`mem_${id}`);
        if (mem) return mem;
        
        // Fallback to local storage (L2)
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(`memory_entry_${id}`);
            if (raw) {
                const parsed = JSON.parse(raw);
                cacheManager.set(`mem_${id}`, parsed);
                return parsed;
            }
        }
        return undefined;
    }
}
