import { KnowledgeNode } from './KnowledgeNode';
export interface KnowledgeGraph {
    nodes: KnowledgeNode[];
    edges: string[];
}
