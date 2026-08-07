import { SchemaManager } from './schemaManager';

export class MigrationManager {
    public executeMigrations(db: IDBDatabase, oldVersion: number, newVersion: number): void {
        try {
            SchemaManager.upgrade(db, oldVersion, newVersion);
            // Record migration state to a special metadata log if needed
        } catch (error) {
            console.error('Failed to execute migrations', error);
            throw error;
        }
    }
}

export const migrationManager = new MigrationManager();
