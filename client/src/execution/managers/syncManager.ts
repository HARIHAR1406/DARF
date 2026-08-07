class SyncManager {
    private writeQueue: Map<string, { key: string, data: string }> = new Map();
    private syncInterval: number | null = null;
    private isSyncing: boolean = false;

    constructor() {
        this.startBackgroundSync();
    }

    public queueWrite(storeKey: string, key: string, data: unknown): void {
        const serialized = typeof data === 'string' ? data : JSON.stringify(data);
        this.writeQueue.set(`${storeKey}::${key}`, { key: `${storeKey}_${key}`, data: serialized });
    }

    public async flush(): Promise<void> {
        if (this.isSyncing || this.writeQueue.size === 0) return;
        
        this.isSyncing = true;
        try {
            const entries = Array.from(this.writeQueue.entries());
            for (const [queueKey, { key, data }] of entries) {
                localStorage.setItem(key, data);
                this.writeQueue.delete(queueKey);
            }
        } catch (error) {
            console.error('Background synchronization failed', error);
        } finally {
            this.isSyncing = false;
        }
    }

    private startBackgroundSync(): void {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            this.syncInterval = window.setInterval(() => {
                this.flush();
            }, 1000) as unknown as number;
        }
    }

    public stopBackgroundSync(): void {
        if (this.syncInterval !== null) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }
}

export const syncManager = new SyncManager();
