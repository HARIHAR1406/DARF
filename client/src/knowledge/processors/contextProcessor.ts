import { KnowledgeNode } from '../models/KnowledgeNode';
import { processDocument } from './documentProcessor';
import { indexMetadata } from '../indexers/metadataIndexer';

export const processContext = (contextId: string, content: string): void => {
    const node: KnowledgeNode = {
        id: contextId,
        type: 'context',
        content,
        metadata: { source: 'execution_context', timestamp: Date.now() }
    };
    
    processDocument(node);
    indexMetadata(node.id, node.metadata!);
};
