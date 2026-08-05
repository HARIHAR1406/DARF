import { FeedbackRecord } from '../models/FeedbackRecord';

export const adaptBehavior = (history: FeedbackRecord[]): string[] => {
    const recommendations: string[] = [];
    if (history.length === 0) return recommendations;
    
    const latest = history[history.length - 1];
    
    if (latest.metrics.consistency < 0.6) {
        recommendations.push("Enforce strict determinism. Lower provider temperature.");
    }
    
    return recommendations;
};
