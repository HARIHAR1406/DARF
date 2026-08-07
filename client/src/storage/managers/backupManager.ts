import { databaseManager } from '../database/databaseManager';
import { STORES } from '../migrations/schemaManager';

export class BackupManager {
    public async exportDatabase(): Promise<string> {
        const backup: Record<string, unknown[]> = {};
        for (const store of STORES) {
            backup[store] = await databaseManager.getAll(store);
        }
        return JSON.stringify(backup);
    }
}

export const backupManager = new BackupManager();
