import { databaseManager } from '../database/databaseManager';

export class VectorRepository {
    private readonly storeName = 'vectors';

    public async saveVector<T>(id: string, vectorData: T): Promise<void> {
        await databaseManager.put(this.storeName, id, vectorData);
    }

    public async getVector<T>(id: string): Promise<T | null> {
        return databaseManager.get<T>(this.storeName, id);
    }

    public async getAllVectors<T>(): Promise<T[]> {
        return databaseManager.getAll<T>(this.storeName);
    }

    public async clear(): Promise<void> {
        await databaseManager.clear(this.storeName);
    }
}

export const vectorRepository = new VectorRepository();
