import { RetrievalResult } from '../models/RetrievalResult';
import { retrieveByVector } from './vectorRetriever';

export const retrieveSemantically = (queryContent: string): RetrievalResult[] => {
    // Uses vector retrieval underneath but can apply additional semantic filters
    // like entity mapping or synonym expansion
    const results = retrieveByVector(queryContent, 0.4); // Lower threshold for broader semantic search
    
    return results.map(r => ({
        ...r,
        explanation: 'Semantic Retrieval Match'
    }));
};
