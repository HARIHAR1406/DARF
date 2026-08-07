import { databaseManager } from '../database/databaseManager';

export class LearningRepository {
    private readonly storeName = 'learning';

    public async saveRecord<T>(id: string, recordData: T): Promise<void> {
        await databaseManager.put(this.storeName, id, recordData);
    }

    public async getRecord<T>(id: string): Promise<T | null> {
        return databaseManager.get<T>(this.storeName, id);
    }

    public async getAllRecords<T>(): Promise<T[]> {
        return databaseManager.getAll<T>(this.storeName);
    }

    public async clear(): Promise<void> {
        await databaseManager.clear(this.storeName);
    }
}

export const learningRepository = new LearningRepository();
