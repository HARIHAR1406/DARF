import { databaseManager } from '../database/databaseManager';

export class ContextRepository {
    private readonly storeName = 'context';

    public async saveContext<T>(id: string, contextData: T): Promise<void> {
        await databaseManager.put(this.storeName, id, contextData);
    }

    public async getContext<T>(id: string): Promise<T | null> {
        return databaseManager.get<T>(this.storeName, id);
    }

    public async getAllContexts<T>(): Promise<T[]> {
        return databaseManager.getAll<T>(this.storeName);
    }

    public async clear(): Promise<void> {
        await databaseManager.clear(this.storeName);
    }
}

export const contextRepository = new ContextRepository();
