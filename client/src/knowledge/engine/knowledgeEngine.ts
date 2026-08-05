import { KnowledgeNode } from '../models/KnowledgeNode';
import { RetrievalResult } from '../models/RetrievalResult';
import { validateKnowledge } from '../validators/knowledgeValidator';
import { processDocument } from '../processors/documentProcessor';
import { retrieveContext } from '../retrievers/contextRetriever';

export class KnowledgeEngine {
    public execute(node: KnowledgeNode): RetrievalResult {
        // Validation Layer
        if (!validateKnowledge(node)) {
            throw new Error('Knowledge validation failed');
        }
        
        // Indexing Layer
        processDocument(node);
        
        // Retrieval Layer (querying the newly indexed node plus existing ones)
        // Since the prompt specifies finding context, we return the top contextual match
        const results = retrieveContext(node.content);
        
        // Return the top result or a fallback
        if (results.length > 0) {
            return results[0];
        }
        
        return { score: 1.0, content: 'Indexed successfully. No broader context found.' };
    }
}
