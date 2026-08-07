import { StorageEntry } from '../models/StorageEntry';
import { DatabaseState } from '../models/DatabaseState';

export const validateStorageEntry = (entry: unknown): entry is StorageEntry => {
    if (!entry || typeof entry !== 'object') return false;
    const obj = entry as Partial<StorageEntry>;
    return (
        typeof obj.id === 'string' &&
        obj.data !== undefined &&
        typeof obj.createdAt === 'number' &&
        typeof obj.updatedAt === 'number' &&
        typeof obj.accessedAt === 'number' &&
        typeof obj.checksum === 'string'
    );
};

export const validateDatabaseState = (state: unknown): state is DatabaseState => {
    if (!state || typeof state !== 'object') return false;
    const obj = state as Partial<DatabaseState>;
    return (
        typeof obj.isInitialized === 'boolean' &&
        typeof obj.version === 'number' &&
        Array.isArray(obj.stores)
    );
};
