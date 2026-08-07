import { KnowledgeNode } from '../models/KnowledgeNode';
import { recoveryManager } from '../../execution/managers/recoveryManager';

const relationshipStore = new Map<string, Set<string>>();

const restoreState = () => {
    const recovered = recoveryManager.restoreCheckpoint<Array<[string, string[]]>>('relationshipIndexer');
    if (recovered) {
        recovered.forEach(([k, v]) => relationshipStore.set(k, new Set(v)));
    }
};
restoreState();

export const indexRelationships = (node: KnowledgeNode, relatedIds: string[]): void => {
    relatedIds.forEach(id => {
        // Bi-directional relationships
        if (!relationshipStore.has(node.id)) {
            relationshipStore.set(node.id, new Set());
        }
        relationshipStore.get(node.id)?.add(id);
        
        if (!relationshipStore.has(id)) {
            relationshipStore.set(id, new Set());
        }
        relationshipStore.get(id)?.add(node.id);
    });
    
    const serialized = Array.from(relationshipStore.entries()).map(([k, v]) => [k, Array.from(v)]);
    recoveryManager.createCheckpoint('relationshipIndexer', serialized);
};

export const getRelationshipStore = () => relationshipStore;
export const clearRelationshipIndex = () => {
    relationshipStore.clear();
    recoveryManager.createCheckpoint('relationshipIndexer', []);
};
