import { LearningState } from '../models/LearningState';
import { EvaluationResult, EvaluationMetrics } from '../models/EvaluationResult';
import { FeedbackRecord } from '../models/FeedbackRecord';
import { validateLearning } from '../validators/learningValidator';

import { evaluateAccuracy } from '../evaluators/accuracyEvaluator';
import { evaluateQuality } from '../evaluators/qualityEvaluator';
import { evaluatePerformance } from '../evaluators/performanceEvaluator';
import { evaluateConsistency } from '../evaluators/consistencyEvaluator';

import { detectAnomaly } from '../analyzers/anomalyAnalyzer';

import { trainResponse } from '../trainers/responseTrainer';
import { trainPrompt } from '../trainers/promptTrainer';
import { trainContext } from '../trainers/contextTrainer';
import { trainWorkflow } from '../trainers/workflowTrainer';

import { adaptFeedback } from '../adapters/feedbackAdapter';
import { adaptOptimization } from '../adapters/optimizationAdapter';
import { adaptBehavior } from '../adapters/behaviorAdapter';
import { adaptStrategy } from '../adapters/strategyAdapter';

// Singleton in-memory state mapping history
const learningHistory: FeedbackRecord[] = [];

export class LearningEngine {
    public execute(state: LearningState): EvaluationResult {
        if (!validateLearning(state)) {
            throw new Error('Learning validation failed: Invalid state payload.');
        }

        const metrics: EvaluationMetrics = {
            accuracy: evaluateAccuracy(state.context),
            quality: evaluateQuality(state.context),
            performance: evaluatePerformance(state.context),
            consistency: evaluateConsistency(state.context),
            confidence: 0.8 // Simulated confidence
        };

        const anomalyDetected = detectAnomaly(metrics);

        const feedback: FeedbackRecord = {
            id: `fb-${Date.now()}`,
            learningStateId: state.id,
            timestamp: Date.now(),
            metrics,
            anomalyDetected
        };

        // Cache historical state
        learningHistory.push(feedback);
        if (learningHistory.length > 1000) learningHistory.shift();

        // Training calculations
        const responseT = trainResponse(state.context);
        const promptT = trainPrompt(state.context);
        const contextT = trainContext(state.context);
        const workflowT = trainWorkflow(state.context);

        const adaptationRequired = responseT.requiresAdaptation || promptT.requiresAdaptation || contextT.requiresAdaptation || workflowT.requiresAdaptation || anomalyDetected;

        // Adaptation logic
        const recommendations: string[] = [
            ...adaptFeedback(learningHistory),
            ...adaptOptimization(learningHistory),
            ...adaptBehavior(learningHistory),
            ...adaptStrategy(learningHistory)
        ];

        return {
            passed: !anomalyDetected,
            accuracy: metrics.accuracy,
            metrics,
            adaptationRequired,
            recommendations: Array.from(new Set(recommendations))
        };
    }
}
