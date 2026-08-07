import { LearningEngine } from '../engine/learningEngine';
import { LearningState } from '../models/LearningState';
import { EvaluationResult } from '../models/EvaluationResult';
import { recoveryManager } from '../../execution/managers/recoveryManager';
import { syncManager } from '../../execution/managers/syncManager';

class LearningService {
    private engine = new LearningEngine();
    private initialized = false;
    
    private initialize(): void {
        if (this.initialized) return;
        
        const recoveredState = recoveryManager.restoreCheckpoint<string>('learning_service_state');
        if (recoveredState === 'active') {
             console.log('Learning service recovered successfully.');
        } else {
             recoveryManager.createCheckpoint('learning_service_state', 'active');
        }
        this.initialized = true;
    }

    public processLearning(state: LearningState): EvaluationResult {
        if (!this.initialized) this.initialize();
        
        const result = this.engine.execute(state);
        
        syncManager.queueWrite('learning', `eval_${state.id}`, result);
        recoveryManager.createCheckpoint('learning_service_state', 'active');
        
        return result;
    }
}

export const learningService = new LearningService();
