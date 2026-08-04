import { KnowledgeNode } from '../models/KnowledgeNode';
export const validateEntity = (node: KnowledgeNode): boolean => !!node.type;
