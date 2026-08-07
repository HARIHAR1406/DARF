export interface StorageEntry<T = unknown> {
    id: string;
    data: T;
    createdAt: number;
    updatedAt: number;
    accessedAt: number;
    expiresAt?: number;
    checksum: string;
}
