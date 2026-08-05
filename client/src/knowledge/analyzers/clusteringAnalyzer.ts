import { RetrievalResult } from '../models/RetrievalResult';

export const clusterResults = (results: RetrievalResult[], k = 3): RetrievalResult[][] => {
    // Basic conceptual clustering - group by semantic similarity threshold
    // Using a simplistic binning approach as a placeholder for K-means
    const clusters: RetrievalResult[][] = [];
    
    // Fallback if no results
    if (results.length === 0) return clusters;
    
    // Sort first
    const sorted = [...results].sort((a, b) => b.score - a.score);
    
    // Simple binning based on score distribution
    for (let i = 0; i < k; i++) {
        clusters.push([]);
    }
    
    const maxScore = sorted[0].score;
    const minScore = sorted[sorted.length - 1].score;
    const range = maxScore - minScore || 1;
    
    sorted.forEach(res => {
        // Normalize position 0 to 1
        const normalized = (res.score - minScore) / range;
        // Find bin index (0 to k-1)
        let bin = Math.floor(normalized * k);
        if (bin === k) bin = k - 1;
        // Higher scores should be in cluster 0
        clusters[k - 1 - bin].push(res);
    });
    
    return clusters;
};
