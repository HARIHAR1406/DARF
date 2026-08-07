import { LearningEngine } from '../engine/learningEngine';
import { LearningState } from '../models/LearningState';
import { EvaluationResult } from '../models/EvaluationResult';
import { recoveryManager } from '../../execution/managers/recoveryManager';
import { syncManager } from '../../execution/managers/syncManager';
import { optimizationManager } from '../../optimization/managers/optimizationManager';

class LearningService {
    private engine = new LearningEngine();
    private initialized = false;
    
    public async initialize(): Promise<void> {
        if (this.initialized) return;
        
        const recoveredState = await recoveryManager.restoreCheckpoint<string>('learning_service_state');
        if (recoveredState === 'active') {
             console.log('Learning service recovered successfully.');
        } else {
             recoveryManager.createCheckpoint('learning_service_state', 'active');
        }
        this.initialized = true;
    }

    public processLearning(state: LearningState): EvaluationResult {
        if (!this.initialized) {
            console.warn('LearningService processed before initialization completed.');
        }
        
        const result = this.engine.execute(state);
        
        // Adjust confidence scoring based on learning feedback
        const optState = optimizationManager.getOptimizationState('learning');
        if (optState.cacheHitRatio > 0.5) {
            result.metrics.confidence = Math.min(1.0, (result.metrics.confidence || 0) + 0.1); // Boost confidence if system is highly cached/stable
        }
        
        syncManager.queueWrite('learning', `eval_${state.id}`, result);
        recoveryManager.createCheckpoint('learning_service_state', 'active');
        
        return result;
    }
}

export const learningService = new LearningService();
