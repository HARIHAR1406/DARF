import { syncManager } from './syncManager';
import { storageService } from '../../storage/services/storageService';

class RecoveryManager {
    private readonly checkpointPrefix = 'ckpt_';
    private debounceTimers: Map<string, number> = new Map();
    
    public scheduleCheckpoint(domain: string, stateProvider: () => unknown, debounceMs: number = 2000): void {
        if (this.debounceTimers.has(domain)) {
            clearTimeout(this.debounceTimers.get(domain)!);
        }
        
        const timerId = window.setTimeout(() => {
            this.createCheckpoint(domain, stateProvider());
            this.debounceTimers.delete(domain);
        }, debounceMs) as unknown as number;
        
        this.debounceTimers.set(domain, timerId);
    }

    public createCheckpoint(domain: string, state: unknown): void {
        const key = `${this.checkpointPrefix}${domain}`;
        const checksum = this.calculateChecksum(JSON.stringify(state));
        
        const payload = {
            state,
            checksum,
            timestamp: Date.now()
        };
        
        syncManager.queueWrite('recovery', key, payload);
    }
    
    public async restoreCheckpoint<T>(domain: string): Promise<T | null> {
        if (typeof globalThis === 'undefined') {
            return null;
        }

        try {
            const raw = await storageService.get<{state: unknown, checksum: string, timestamp: number}>('sessions', `recovery_${this.checkpointPrefix}${domain}`);
            if (!raw) return null;

            const currentChecksum = this.calculateChecksum(JSON.stringify(raw.state));
            
            if (currentChecksum !== raw.checksum) {
                console.error(`Corruption detected in checkpoint for domain ${domain}.`);
                return null;
            }
            
            return raw.state as T;
        } catch (error) {
            console.error(`Failed to restore checkpoint for ${domain}`, error);
            return null;
        }
    }
    
    public calculateChecksum(data: string): string {
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    }
}

export const recoveryManager = new RecoveryManager();
