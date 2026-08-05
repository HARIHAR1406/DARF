import { EvaluationMetrics } from '../models/EvaluationResult';

export const detectAnomaly = (metrics: EvaluationMetrics): boolean => {
    // Basic threshold outlier detection
    if (metrics.accuracy < 0.3) return true;
    if (metrics.performance < 0.2) return true;
    if (metrics.quality < 0.4) return true;
    
    // Weighted Z-score equivalent mock
    const compositeScore = (metrics.accuracy * 0.4) + (metrics.performance * 0.3) + (metrics.quality * 0.3);
    
    return compositeScore < 0.4;
};
