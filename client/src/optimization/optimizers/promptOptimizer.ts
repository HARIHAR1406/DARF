export class PromptOptimizer {
    public optimizePrompt(prompt: string): string {
        // Compress prompt by removing excess whitespace and redundant phrases
        let optimized = prompt.replace(/\s+/g, ' ').trim();
        
        // Remove common redundant polite fillers if they are at the beginning
        optimized = optimized.replace(/^(please|could you|would you|can you|i would like you to) /i, '');
        
        return optimized;
    }

    public scorePrompt(prompt: string): number {
        // Evaluate prompt clarity (length, explicit directives)
        let score = 1.0;
        if (prompt.length < 10) score -= 0.5; // Too short
        if (prompt.length > 2000) score -= 0.2; // Too long
        if (prompt.match(/(step by step|detailed|explain)/i)) score += 0.2; // High clarity directives
        return Math.max(0, Math.min(1.0, score));
    }
}

export const promptOptimizer = new PromptOptimizer();
