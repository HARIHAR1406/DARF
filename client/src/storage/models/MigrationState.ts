export interface MigrationState {
    fromVersion: number;
    toVersion: number;
    timestamp: number;
    success: boolean;
    errorDetails?: string;
}
