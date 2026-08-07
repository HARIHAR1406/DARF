import { connectionManager } from '../database/connectionManager';
import { databaseManager } from '../database/databaseManager';
import { storageManager } from '../managers/storageManager';
import { backupManager } from '../managers/backupManager';
import { restoreManager } from '../managers/restoreManager';

export class StorageService {
    public async initialize(): Promise<void> {
        // Enforce singleton init of IndexedDB connection
        await connectionManager.getConnection();
    }

    public async enforceLimits(): Promise<void> {
        await storageManager.enforceCapacityLimits();
    }

    public async shutdown(): Promise<void> {
        await connectionManager.closeConnection();
    }

    public async backup(): Promise<string> {
        return backupManager.exportDatabase();
    }

    public async restore(jsonString: string): Promise<void> {
        return restoreManager.importDatabase(jsonString);
    }
    
    // Low level direct access if needed by other components, though repos are preferred
    public async put<T>(storeName: string, id: string, data: T, ttl?: number): Promise<void> {
        return databaseManager.put(storeName, id, data, ttl);
    }

    public async get<T>(storeName: string, id: string): Promise<T | null> {
        return databaseManager.get<T>(storeName, id);
    }
}

export const storageService = new StorageService();
