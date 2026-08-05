import { KnowledgeNode } from './KnowledgeNode';

export interface RetrievalResult {
    score: number;
    content: string;
    node?: KnowledgeNode;
    explanation?: string;
}
