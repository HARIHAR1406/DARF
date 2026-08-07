import { databaseManager } from '../database/databaseManager';

export class KnowledgeRepository {
    private readonly storeName = 'knowledge';

    public async saveNode<T>(id: string, nodeData: T): Promise<void> {
        await databaseManager.put(this.storeName, id, nodeData);
    }

    public async getNode<T>(id: string): Promise<T | null> {
        return databaseManager.get<T>(this.storeName, id);
    }

    public async getAllNodes<T>(): Promise<T[]> {
        return databaseManager.getAll<T>(this.storeName);
    }

    public async clear(): Promise<void> {
        await databaseManager.clear(this.storeName);
    }
}

export const knowledgeRepository = new KnowledgeRepository();
