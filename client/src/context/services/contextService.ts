import { ContextEngine } from '../engine/contextEngine';
import { ContextEntry } from '../models/ContextEntry';
import { RetrievalResult } from '../models/RetrievalResult';
import { recoveryManager } from '../../execution/managers/recoveryManager';
import { syncManager } from '../../execution/managers/syncManager';

class ContextService {
    private engine = new ContextEngine();
    private initialized = false;

    public initialize(): void {
        if (this.initialized) return;
        
        // Restore context specific states if any
        const recoveredState = recoveryManager.restoreCheckpoint<string>('context_service_state');
        if (recoveredState === 'active') {
            console.log('Context service recovered successfully.');
        } else {
            recoveryManager.createCheckpoint('context_service_state', 'active');
        }
        
        this.initialized = true;
    }

    public processContext(entry: ContextEntry): RetrievalResult {
        if (!this.initialized) this.initialize();
        
        const result = this.engine.process(entry);
        syncManager.queueWrite('context', `entry_${entry.id}`, entry);
        return result;
    }
}

export const contextService = new ContextService();
