import { KnowledgeNode } from './KnowledgeNode';

export interface KnowledgeEdge {
    sourceId: string;
    targetId: string;
    relationshipType: string;
    weight: number;
}

export interface KnowledgeGraph {
    nodes: Map<string, KnowledgeNode>;
    edges: KnowledgeEdge[];
}
