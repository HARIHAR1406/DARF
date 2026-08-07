import { connectionManager } from './connectionManager';
import { StorageEntry } from '../models/StorageEntry';

export class DatabaseManager {
    
    private generateChecksum(data: unknown): string {
        const str = typeof data === 'string' ? data : JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    }

    public async put<T>(storeName: string, id: string, data: T, ttl?: number): Promise<void> {
        const db = await connectionManager.getConnection();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            const entry: StorageEntry<T> = {
                id,
                data,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                accessedAt: Date.now(),
                expiresAt: ttl ? Date.now() + ttl : undefined,
                checksum: this.generateChecksum(data)
            };

            const request = store.put(entry);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
            transaction.onerror = () => reject(transaction.error);
        });
    }

    public async get<T>(storeName: string, id: string): Promise<T | null> {
        const db = await connectionManager.getConnection();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite'); // Readwrite to update accessedAt if needed
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => {
                const entry = request.result as StorageEntry<T> | undefined;
                if (!entry) {
                    return resolve(null);
                }

                if (entry.expiresAt && Date.now() > entry.expiresAt) {
                    store.delete(id);
                    return resolve(null);
                }

                // Verify checksum
                const currentChecksum = this.generateChecksum(entry.data);
                if (currentChecksum !== entry.checksum) {
                    console.error(`Checksum mismatch for ${id} in ${storeName}`);
                    store.delete(id); // Corrupted data
                    return resolve(null);
                }

                // Update accessedAt asynchronously
                entry.accessedAt = Date.now();
                store.put(entry);
                
                resolve(entry.data);
            };

            request.onerror = () => reject(request.error);
        });
    }

    public async delete(storeName: string, id: string): Promise<void> {
        const db = await connectionManager.getConnection();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    public async getAll<T>(storeName: string): Promise<Array<T>> {
        const db = await connectionManager.getConnection();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const entries = request.result as StorageEntry<T>[];
                const validEntries = entries.filter(e => !e.expiresAt || Date.now() <= e.expiresAt);
                resolve(validEntries.map(e => e.data));
            };
            request.onerror = () => reject(request.error);
        });
    }

    public async clear(storeName: string): Promise<void> {
        const db = await connectionManager.getConnection();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

export const databaseManager = new DatabaseManager();
