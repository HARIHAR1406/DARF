import { EvaluationResult, EvaluationMetrics } from '../models/EvaluationResult';

export const validateEvaluationMetrics = (metrics: Partial<EvaluationMetrics>): boolean => {
    if (!metrics) return false;
    
    const requiredKeys: (keyof EvaluationMetrics)[] = ['accuracy', 'quality', 'performance', 'consistency', 'confidence'];
    
    for (const key of requiredKeys) {
        const val = metrics[key];
        if (typeof val !== 'number' || isNaN(val) || !isFinite(val) || val < 0 || val > 1) {
            return false;
        }
    }
    
    return true;
};

export const validateEvaluation = (result: Partial<EvaluationResult>): boolean => {
    if (!result) return false;
    if (typeof result !== 'object' || Object.keys(result).length === 0) return false;
    
    if (typeof result.passed !== 'boolean') return false;
    if (typeof result.accuracy !== 'number' || isNaN(result.accuracy) || !isFinite(result.accuracy)) return false;
    if (typeof result.adaptationRequired !== 'boolean') return false;
    
    if (!Array.isArray(result.recommendations)) return false;
    
    if (!result.metrics || !validateEvaluationMetrics(result.metrics)) return false;
    
    return true;
};
