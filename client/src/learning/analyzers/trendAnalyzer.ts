import { FeedbackRecord } from '../models/FeedbackRecord';

export const analyzeTrend = (history: FeedbackRecord[]): number => {
    // Moving average of accuracy
    if (history.length === 0) return 1.0;
    
    const recent = history.slice(-5);
    let sum = 0;
    recent.forEach(r => sum += r.metrics.accuracy);
    
    return sum / recent.length;
};
