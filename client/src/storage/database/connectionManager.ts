import { migrationManager } from '../migrations/migrationManager';

export class ConnectionManager {
    private dbName = 'DARF_Database';
    private dbVersion = 2;
    private db: IDBDatabase | null = null;
    private initPromise: Promise<IDBDatabase> | null = null;

    public async getConnection(): Promise<IDBDatabase> {
        if (this.db) return this.db;
        if (this.initPromise) return this.initPromise;

        this.initPromise = new Promise((resolve, reject) => {
            if (typeof globalThis === 'undefined' || !globalThis.indexedDB) {
                return reject(new Error('IndexedDB is not supported in this environment'));
            }

            const request = globalThis.indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                console.error('IndexedDB connection error', event);
                this.initPromise = null;
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const database = request.result;
                migrationManager.executeMigrations(database, event.oldVersion, event.newVersion || this.dbVersion);
            };
        });

        return this.initPromise;
    }

    public async closeConnection(): Promise<void> {
        if (this.db) {
            this.db.close();
            this.db = null;
            this.initPromise = null;
        }
    }
}

export const connectionManager = new ConnectionManager();
