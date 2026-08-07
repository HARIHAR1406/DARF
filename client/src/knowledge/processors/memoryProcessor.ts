import { KnowledgeNode } from '../models/KnowledgeNode';
import { processDocument } from './documentProcessor';
import { indexMetadata } from '../indexers/metadataIndexer';

export const processMemory = (memoryId: string, content: string): void => {
    const node: KnowledgeNode = {
        id: memoryId,
        type: 'memory',
        content,
        metadata: { source: 'user_memory', timestamp: Date.now() }
    };
    
    processDocument(node);
    indexMetadata(node, node.metadata as Record<string, string>);
};
