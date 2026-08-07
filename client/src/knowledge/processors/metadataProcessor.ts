import { indexMetadata } from '../indexers/metadataIndexer';
import { KnowledgeNode } from '../models/KnowledgeNode';

export const processMetadata = (nodeId: string, metadata: Record<string, string | number | boolean>): void => {
    // Process and enrich metadata before indexing
    const enrichedMetadata = {
        ...metadata,
        processedAt: Date.now(),
        version: 1.0
    };
    
    indexMetadata({ id: nodeId } as unknown as KnowledgeNode, enrichedMetadata as unknown as Record<string, string>);
};
