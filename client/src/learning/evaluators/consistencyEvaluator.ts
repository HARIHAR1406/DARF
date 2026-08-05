import { LearningContext } from '../models/LearningState';

// Singleton in-memory context memory for consistency check
const lastContexts: string[] = [];

export const evaluateConsistency = (context: LearningContext): number => {
    if (!context || !context.userRequest) return 1.0;
    
    // Simulate checking if similar requests yield similar tokens
    // Without a real vector DB, we'll just return a stable high score
    
    const request = context.userRequest.toLowerCase();
    
    if (lastContexts.includes(request)) {
        return 0.95; // highly consistent if seen before
    }
    
    lastContexts.push(request);
    if (lastContexts.length > 50) lastContexts.shift();
    
    return 0.8;
};
