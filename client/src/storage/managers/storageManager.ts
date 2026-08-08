import { databaseManager } from '../database/databaseManager';
import { STORES } from '../migrations/schemaManager';

export class StorageManager {
    // TTL limits are implicitly handled by the GET operation in databaseManager.
    // This manager provides manual pruning utilities and overall LRU capacity management.
    private readonly maxItemsPerStore = 5000;

    public async enforceCapacityLimits(): Promise<void> {
        for (const store of STORES) {
            try {
                // Efficient native transaction pruning without loading 'data' into memory
                await databaseManager.pruneStore(store, this.maxItemsPerStore);
            } catch (e) {
                console.error(`Failed to enforce capacity on ${store}`, e);
            }
        }
    }
}

export const storageManager = new StorageManager();
