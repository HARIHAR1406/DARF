import { LearningContext } from '../models/LearningState';
import { evaluateAccuracy } from '../evaluators/accuracyEvaluator';
import { evaluateQuality } from '../evaluators/qualityEvaluator';

export const trainResponse = (context: LearningContext): { score: number, requiresAdaptation: boolean } => {
    const accuracy = evaluateAccuracy(context);
    const quality = evaluateQuality(context);
    
    // Weight response quality heavily
    const finalScore = (accuracy * 0.4) + (quality * 0.6);
    
    return {
        score: finalScore,
        requiresAdaptation: finalScore < 0.7
    };
};
