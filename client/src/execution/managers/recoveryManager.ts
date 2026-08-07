import { syncManager } from './syncManager';

class RecoveryManager {
    private readonly checkpointPrefix = 'ckpt_';
    
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
    
    public restoreCheckpoint<T>(domain: string): T | null {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return null;
        }

        const raw = localStorage.getItem(`recovery_${this.checkpointPrefix}${domain}`);
        if (!raw) return null;

        try {
            const payload = JSON.parse(raw);
            const currentChecksum = this.calculateChecksum(JSON.stringify(payload.state));
            
            if (currentChecksum !== payload.checksum) {
                console.error(`Corruption detected in checkpoint for domain ${domain}.`);
                return null;
            }
            
            return payload.state as T;
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
