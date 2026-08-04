import { KnowledgeNode } from '../models/KnowledgeNode';
export const validateKnowledge = (node: KnowledgeNode): boolean => !!node.id;
