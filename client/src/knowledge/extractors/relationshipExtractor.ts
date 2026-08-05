import { KnowledgeEdge } from '../models/KnowledgeGraph';

export const extractRelationships = (content: string, entities: string[]): KnowledgeEdge[] => {
    const edges: KnowledgeEdge[] = [];
    
    // Simple heuristic: if two entities appear in the same sentence, they are related
    const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
    
    sentences.forEach((sentence, index) => {
        const foundEntities = entities.filter(e => sentence.includes(e));
        for (let i = 0; i < foundEntities.length; i++) {
            for (let j = i + 1; j < foundEntities.length; j++) {
                edges.push({
                    sourceId: foundEntities[i],
                    targetId: foundEntities[j],
                    relationshipType: 'co-occurrence',
                    weight: 1.0 / (index + 1)
                });
            }
        }
    });
    
    return edges;
};
