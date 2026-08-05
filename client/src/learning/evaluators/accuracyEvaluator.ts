import { LearningContext } from '../models/LearningState';

export const evaluateAccuracy = (context: LearningContext): number => {
    if (!context || !context.providerResponse) return 0.0;
    
    // Simulate accuracy score calculation based on payload length and knowledge score
    const responseLen = context.providerResponse.length;
    const kScore = context.knowledgeScore || 0.5;
    
    let baseScore = 0.5 + (kScore * 0.4); // Max 0.9 from knowledge
    
    // Slight penalty for extremely short or extremely long responses indicating low accuracy
    if (responseLen < 10) baseScore -= 0.3;
    if (responseLen > 4000) baseScore -= 0.1;
    
    return Math.max(0, Math.min(1, baseScore));
};
