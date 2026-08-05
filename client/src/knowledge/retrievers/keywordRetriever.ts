import { RetrievalResult } from '../models/RetrievalResult';
import { extractKeywords } from '../extractors/keywordExtractor';
import { getKeywordIndex } from '../indexers/keywordIndexer';
import { getNodeStore } from '../indexers/vectorIndexer';

export const retrieveByKeyword = (queryContent: string): RetrievalResult[] => {
    const queryKeywords = extractKeywords(queryContent);
    const keywordIndex = getKeywordIndex();
    const nodeStore = getNodeStore();
    
    // Map of Node ID to Match Count
    const matchCounts = new Map<string, number>();
    
    queryKeywords.forEach(kw => {
        const lowerKw = kw.toLowerCase();
        if (keywordIndex.has(lowerKw)) {
            const nodeIds = keywordIndex.get(lowerKw)!;
            nodeIds.forEach(id => {
                matchCounts.set(id, (matchCounts.get(id) || 0) + 1);
            });
        }
    });
    
    const results: RetrievalResult[] = [];
    
    matchCounts.forEach((count, id) => {
        const node = nodeStore.get(id);
        if (node) {
            results.push({
                // Score based on proportion of matched keywords
                score: count / queryKeywords.length,
                content: node.content,
                node,
                explanation: `Keyword Match (${count}/${queryKeywords.length})`
            });
        }
    });
    
    return results;
};
