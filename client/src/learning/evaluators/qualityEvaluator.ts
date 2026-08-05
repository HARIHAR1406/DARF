import { LearningContext } from '../models/LearningState';

export const evaluateQuality = (context: LearningContext): number => {
    if (!context || !context.providerResponse) return 0.0;
    
    // Evaluate formatting, lack of raw error stacks, etc.
    const hasErrorStr = context.providerResponse.toLowerCase().includes('error');
    const hasExceptionStr = context.providerResponse.toLowerCase().includes('exception');
    
    let quality = 0.9; // Base good quality
    if (hasErrorStr) quality -= 0.3;
    if (hasExceptionStr) quality -= 0.4;
    
    return Math.max(0, Math.min(1, quality));
};
