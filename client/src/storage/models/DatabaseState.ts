export interface DatabaseState {
    isInitialized: boolean;
    version: number;
    stores: string[];
    lastBackupAt?: number;
    lastMigrationAt?: number;
}
