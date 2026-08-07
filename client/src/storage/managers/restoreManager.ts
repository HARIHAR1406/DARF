import { databaseManager } from '../database/databaseManager';
import { STORES } from '../migrations/schemaManager';

export class RestoreManager {
    public async importDatabase(jsonString: string): Promise<void> {
        try {
            const data = JSON.parse(jsonString) as Record<string, Array<{id: string, data: unknown}>>;
            
            for (const store of STORES) {
                if (data[store] && Array.isArray(data[store])) {
                    await databaseManager.clear(store); // Clear old before restore
                    for (const entry of data[store]) {
                        if (entry.id) {
                            await databaseManager.put(store, entry.id, entry);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Database restore failed', error);
            throw error;
        }
    }
}

export const restoreManager = new RestoreManager();
