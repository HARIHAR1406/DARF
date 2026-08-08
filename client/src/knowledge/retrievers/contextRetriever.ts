import { RetrievalResult } from '../models/RetrievalResult';
import { retrieveByVector } from './vectorRetriever';
import { retrieveByKeyword } from './keywordRetriever';
import { calculateRelevance } from '../analyzers/relevanceAnalyzer';
import { rankResults } from '../analyzers/rankingAnalyzer';
import { cacheManager } from '../../execution/managers/cacheManager';

export const retrieveContext = (queryContent: string): RetrievalResult[] => {
    const safeContent = encodeURIComponent(queryContent.substring(0, 255));
    const cacheKey = `ctx_ret_${btoa(safeContent).substring(0, 32)}`;
    const cached = cacheManager.get<RetrievalResult[]>(cacheKey);
    if (cached) return cached;

    // Hybrid contextual retrieval blending semantic and keyword scoring
    const semanticResults = retrieveByVector(queryContent, 0.2); // Broad search
    const keywordResults = retrieveByKeyword(queryContent);
    
    // Merge results
    const combinedMap = new Map<string, RetrievalResult>();
    
    semanticResults.forEach(r => {
        if (r.node) combinedMap.set(r.node.id, { ...r, explanation: 'Hybrid Context' });
    });
    
    keywordResults.forEach(r => {
        if (r.node) {
            if (combinedMap.has(r.node.id)) {
                // Combine scores using relevanceAnalyzer
                const existing = combinedMap.get(r.node.id)!;
                existing.score = calculateRelevance(existing.score, r.score, 0.7);
            } else {
                combinedMap.set(r.node.id, { 
                    ...r, 
                    score: calculateRelevance(0, r.score, 0.7),
                    explanation: 'Hybrid Context'
                });
            }
        }
    });
    
    const finalResults = Array.from(combinedMap.values());
    const ranked = rankResults(finalResults).slice(0, 5); // Top 5 contextual results
    
    cacheManager.set(cacheKey, ranked, 60000);
    
    return ranked;
};
