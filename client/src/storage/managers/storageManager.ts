import { databaseManager } from '../database/databaseManager';
import { STORES } from '../migrations/schemaManager';

export class StorageManager {
    // TTL limits are implicitly handled by the GET operation in databaseManager.
    // This manager provides manual pruning utilities and overall LRU capacity management.
    private readonly maxItemsPerStore = 5000;

    public async enforceCapacityLimits(): Promise<void> {
        for (const store of STORES) {
            try {
                // Fetch all entries manually to enforce LRU logic
                // In a production WebWorker, this would use a cursor with an index,
                // but this satisfies the basic LRU requirements.
                const entries = await databaseManager.getAll<{id: string, accessedAt: number}>(store);
                if (entries.length > this.maxItemsPerStore) {
                    entries.sort((a, b) => a.accessedAt - b.accessedAt);
                    const overage = entries.length - this.maxItemsPerStore;
                    const toDelete = entries.slice(0, overage);
                    
                    for (const item of toDelete) {
                        await databaseManager.delete(store, item.id);
                    }
                }
            } catch (e) {
                console.error(`Failed to enforce capacity on ${store}`, e);
            }
        }
    }
}

export const storageManager = new StorageManager();
