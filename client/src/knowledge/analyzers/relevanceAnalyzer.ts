import { RetrievalResult } from '../models/RetrievalResult';

export const calculateRelevance = (semanticScore: number, keywordScore: number, weightSemantic = 0.7): number => {
    // Hybrid scoring algorithm blending semantic and keyword matching
    const weightKeyword = 1.0 - weightSemantic;
    return (semanticScore * weightSemantic) + (keywordScore * weightKeyword);
};

export const filterIrrelevant = (results: RetrievalResult[], threshold = 0.3): RetrievalResult[] => {
    return results.filter(r => r.score >= threshold);
};
