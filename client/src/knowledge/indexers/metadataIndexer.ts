import { KnowledgeNode } from '../models/KnowledgeNode';
import { recoveryManager } from '../../execution/managers/recoveryManager';

const metadataStore = new Map<string, Set<string>>();

const restoreState = () => {
    const recovered = recoveryManager.restoreCheckpoint<Array<[string, string[]]>>('metadataIndexer');
    if (recovered) {
        recovered.forEach(([k, v]) => metadataStore.set(k, new Set(v)));
    }
};
restoreState();

export const indexMetadata = (node: KnowledgeNode, metadata: Record<string, string>): void => {
    Object.entries(metadata).forEach(([key, value]) => {
        const indexKey = `${key}:${value}`;
        if (!metadataStore.has(indexKey)) {
            metadataStore.set(indexKey, new Set());
        }
        metadataStore.get(indexKey)?.add(node.id);
    });
    
    const serialized = Array.from(metadataStore.entries()).map(([k, v]) => [k, Array.from(v)]);
    recoveryManager.createCheckpoint('metadataIndexer', serialized);
};

export const getMetadataStore = () => metadataStore;
export const clearMetadataIndex = () => {
    metadataStore.clear();
    recoveryManager.createCheckpoint('metadataIndexer', []);
};
