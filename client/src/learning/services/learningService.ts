import { LearningEngine } from '../engine/learningEngine';
import { LearningState } from '../models/LearningState';
import { EvaluationResult } from '../models/EvaluationResult';

class LearningService {
    private engine = new LearningEngine();

    public processLearning(state: LearningState): EvaluationResult {
        return this.engine.execute(state);
    }
}

export const learningService = new LearningService();
