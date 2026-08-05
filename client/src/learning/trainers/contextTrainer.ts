import { LearningContext } from '../models/LearningState';

export const trainContext = (context: LearningContext): { score: number, requiresAdaptation: boolean } => {
    // If context token usage is too high compared to the request, we need compression
    const tokenUsage = context.tokenUsage || 1000; // Mock default
    const requestLen = context.userRequest ? context.userRequest.length : 100;
    
    // Simplistic heuristic for context efficiency
    const ratio = requestLen / Math.max(1, tokenUsage);
    
    let score = 1.0;
    if (ratio < 0.01) score = 0.5; // Highly inefficient, sending too much context
    if (ratio > 10) score = 0.8; // Probably not sending enough context
    
    return {
        score,
        requiresAdaptation: score < 0.7
    };
};
