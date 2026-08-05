import { RetrievalResult } from '../models/RetrievalResult';
import { retrieveByVector } from './vectorRetriever';
import { retrieveByKeyword } from './keywordRetriever';
import { calculateRelevance } from '../analyzers/relevanceAnalyzer';
import { rankResults } from '../analyzers/rankingAnalyzer';

export const retrieveContext = (queryContent: string): RetrievalResult[] => {
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
    return rankResults(finalResults).slice(0, 5); // Top 5 contextual results
};
