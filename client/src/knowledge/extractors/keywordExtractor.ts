export const extractKeywords = (content: string): string[] => {
    // Basic stop word removal and tokenization
    const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'of', 'to', 'with', 'for']);
    const words = content.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const keywords = words.filter(w => w.length > 2 && !stopWords.has(w));
    
    // Count frequency
    const freq: Record<string, number> = {};
    keywords.forEach(k => freq[k] = (freq[k] || 0) + 1);
    
    // Sort by frequency and return top keywords
    return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 10);
};
