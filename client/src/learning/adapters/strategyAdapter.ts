import { FeedbackRecord } from '../models/FeedbackRecord';

export const adaptStrategy = (history: FeedbackRecord[]): string[] => {
    const recommendations: string[] = [];
    if (history.length === 0) return recommendations;
    
    const latest = history[history.length - 1];
    
    if (latest.anomalyDetected) {
        recommendations.push("Engage Fallback Strategy. Pause primary execution.");
    }
    
    return recommendations;
};
