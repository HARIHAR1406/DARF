export const STORES = [
    'vectors',
    'knowledge',
    'context',
    'learning',
    'optimization',
    'sessions',
    'metadata',
    'telemetry'
];

export class SchemaManager {
    public static upgrade(db: IDBDatabase, oldVersion: number, newVersion: number): void {
        console.log(`Upgrading database schema from v${oldVersion} to v${newVersion}`);
        
        for (const storeName of STORES) {
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { keyPath: 'id' });
                // Common indices
                store.createIndex('accessedAt', 'accessedAt', { unique: false });
                store.createIndex('expiresAt', 'expiresAt', { unique: false });
            }
        }
        
        // Version-specific migrations can be added here in the future
    }
}
