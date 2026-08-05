import { EvaluationMetrics } from './EvaluationResult';

export interface FeedbackRecord {
    id: string;
    learningStateId: string;
    timestamp: number;
    metrics: EvaluationMetrics;
    anomalyDetected: boolean;
}
