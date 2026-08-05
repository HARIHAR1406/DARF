import { RetrievalResult } from '../models/RetrievalResult';
import { getVectorStore, getNodeStore } from '../indexers/vectorIndexer';
import { calculateCosineSimilarity } from '../analyzers/similarityAnalyzer';
import { generateSemanticVector } from '../extractors/semanticExtractor';

export const retrieveByVector = (queryContent: string, threshold = 0.5): RetrievalResult[] => {
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
    
    return results;
};
