import { FeedbackRecord } from '../models/FeedbackRecord';

export const predictNextScore = (history: FeedbackRecord[]): number => {
    if (history.length < 2) return 0.8;
    
    // Linear progression mock
    const last = history[history.length - 1].metrics.accuracy;
    const prev = history[history.length - 2].metrics.accuracy;
    
    const delta = last - prev;
    
    // Project next state
    const predicted = last + delta;
    return Math.max(0, Math.min(1, predicted));
};

export const calculateConfidence = (history: FeedbackRecord[]): number => {
    // More history = higher confidence
    const maxHistory = 100;
    const confidence = history.length / maxHistory;
    return Math.max(0.1, Math.min(1, confidence));
};
