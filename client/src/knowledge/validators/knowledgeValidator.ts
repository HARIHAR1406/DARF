import { KnowledgeNode } from '../models/KnowledgeNode';

export const validateKnowledge = (node: Partial<KnowledgeNode>): boolean => {
    if (!node) return false;
    if (!node.id || typeof node.id !== 'string' || node.id.trim() === '') return false;
    if (!node.type || typeof node.type !== 'string') return false;
    if (!node.content || typeof node.content !== 'string') return false;
    return true;
};
