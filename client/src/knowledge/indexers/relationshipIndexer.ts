import { KnowledgeEdge } from '../models/KnowledgeGraph';

const relationshipIndex = new Map<string, KnowledgeEdge[]>();

export const indexRelationship = (edge: KnowledgeEdge): void => {
    // Index by source
    if (!relationshipIndex.has(edge.sourceId)) {
        relationshipIndex.set(edge.sourceId, []);
    }
    relationshipIndex.get(edge.sourceId)!.push(edge);
    
    // Index by target for bi-directional traversal
    if (!relationshipIndex.has(edge.targetId)) {
        relationshipIndex.set(edge.targetId, []);
    }
    relationshipIndex.get(edge.targetId)!.push(edge);
};

export const getRelationshipIndex = () => relationshipIndex;
export const clearRelationshipIndex = () => relationshipIndex.clear();
