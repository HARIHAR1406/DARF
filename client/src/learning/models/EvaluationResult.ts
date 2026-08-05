export interface EvaluationMetrics {
    accuracy: number;
    quality: number;
    performance: number;
    consistency: number;
    confidence: number;
}

export interface EvaluationResult {
    passed: boolean;
    accuracy: number;
    metrics: EvaluationMetrics;
    adaptationRequired: boolean;
    recommendations: string[];
}
