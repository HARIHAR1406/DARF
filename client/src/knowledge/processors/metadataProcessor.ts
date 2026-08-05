import { indexMetadata } from '../indexers/metadataIndexer';

export const processMetadata = (nodeId: string, metadata: Record<string, string | number | boolean>): void => {
    // Process and enrich metadata before indexing
    const enrichedMetadata = {
        ...metadata,
        processedAt: Date.now(),
        version: 1.0
    };
    
    indexMetadata(nodeId, enrichedMetadata);
};
