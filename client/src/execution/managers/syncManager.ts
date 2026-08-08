import { storageService } from '../../storage/services/storageService';
import { STORES } from '../../storage/migrations/schemaManager';

class SyncManager {
    private writeQueue: Map<string, { store: string, key: string, data: unknown }> = new Map();
    private syncInterval: number | null = null;
    private isSyncing: boolean = false;

    constructor() {
        this.startBackgroundSync();
    }

    public queueWrite(storeKey: string, key: string, data: unknown): void {
        this.writeQueue.set(`${storeKey}::${key}`, { store: storeKey, key, data });
    }

    public async flush(): Promise<void> {
        if (this.isSyncing || this.writeQueue.size === 0) return;
        
        this.isSyncing = true;
        try {
            const entries = Array.from(this.writeQueue.entries());
            for (const [queueKey, { store, key, data }] of entries) {
                // If it's a specific store, write there. Otherwise default to 'metadata' or 'sessions'
                const targetStore = STORES.includes(store) ? store : 'metadata';
                await storageService.put(targetStore, key, data);
                this.writeQueue.delete(queueKey);
            }
        } catch (error) {
            console.error('Background synchronization failed', error);
        } finally {
            this.isSyncing = false;
        }
    }

    private startBackgroundSync(): void {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            this.syncInterval = window.setInterval(() => {
                this.flush();
            }, 1000) as unknown as number;
        }
    }

    public stopBackgroundSync(): void {
        if (this.syncInterval !== null) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }
}

export const syncManager = new SyncManager();
