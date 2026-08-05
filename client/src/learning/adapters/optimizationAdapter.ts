import { FeedbackRecord } from '../models/FeedbackRecord';

export const adaptOptimization = (history: FeedbackRecord[]): string[] => {
    const recommendations: string[] = [];
    if (history.length === 0) return recommendations;
    
    const latest = history[history.length - 1];
    
    if (latest.metrics.performance < 0.5) {
        recommendations.push("Enable aggressive caching. Skip semantic fallback.");
    }
    
    return recommendations;
};
