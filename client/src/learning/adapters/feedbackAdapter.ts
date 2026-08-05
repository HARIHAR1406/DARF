import { FeedbackRecord } from '../models/FeedbackRecord';

export const adaptFeedback = (history: FeedbackRecord[]): string[] => {
    const recommendations: string[] = [];
    if (history.length === 0) return recommendations;
    
    const latest = history[history.length - 1];
    
    if (latest.metrics.accuracy < 0.6) {
        recommendations.push("Increase knowledge retrieval weight.");
    }
    
    if (latest.metrics.quality < 0.6) {
        recommendations.push("Inject strict formatting prompt wrappers.");
    }
    
    return recommendations;
};
