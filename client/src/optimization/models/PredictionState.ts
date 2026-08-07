export interface PredictionState {
    id: string;
    predictedRoute: string;
    failureProbability: number;
    loadPrediction: number;
    performanceDegradationRisk: number;
    confidence: number;
    predictedAt: number;
    validUntil: number;
}
