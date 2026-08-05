// Map of metadata keys to values to Set of Node IDs
const metadataIndex = new Map<string, Map<string | number | boolean, Set<string>>>();

export const indexMetadata = (nodeId: string, metadata: Record<string, string | number | boolean>): void => {
    Object.entries(metadata).forEach(([key, value]) => {
        if (!metadataIndex.has(key)) {
            metadataIndex.set(key, new Map());
        }
        
        const valueMap = metadataIndex.get(key)!;
        if (!valueMap.has(value)) {
            valueMap.set(value, new Set());
        }
        
        valueMap.get(value)!.add(nodeId);
    });
};

export const getMetadataIndex = () => metadataIndex;
export const clearMetadataIndex = () => metadataIndex.clear();
