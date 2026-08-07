import { RetrievalResult } from '../models/RetrievalResult';
import { getVectorStore, getNodeStore } from '../indexers/vectorIndexer';
import { calculateCosineSimilarity } from '../analyzers/similarityAnalyzer';
import { generateSemanticVector } from '../extractors/semanticExtractor';
import { cacheManager } from '../../execution/managers/cacheManager';

export const retrieveByVector = (queryContent: string, threshold = 0.5): RetrievalResult[] => {
    const cacheKey = `vec_ret_${Buffer.from(queryContent).toString('base64').substring(0, 32)}_${threshold}`;
    const cached = cacheManager.get<RetrievalResult[]>(cacheKey);
    if (cached) return cached;

    const queryVector = generateSemanticVector(queryContent);
    const querySemanticVec = { id: 'query', dimensions: queryVector };
    
    const vectorStore = getVectorStore();
    const nodeStore = getNodeStore();
    
    const results: RetrievalResult[] = [];
    
    vectorStore.forEach((vec, id) => {
        const score = calculateCosineSimilarity(querySemanticVec, vec);
        if (score >= threshold) {
            const node = nodeStore.get(id);
            if (node) {
                results.push({
                    score,
                    content: node.content,
                    node,
                    explanation: 'Vector Cosine Similarity Match'
                });
            }
        }
    });
    
    // Sort and cache the result
    results.sort((a, b) => b.score - a.score);
    cacheManager.set(cacheKey, results, 60000);
    
    return results;
};
