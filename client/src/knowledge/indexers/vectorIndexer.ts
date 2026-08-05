import { KnowledgeNode } from '../models/KnowledgeNode';
import { SemanticVector } from '../models/SemanticVector';

// Singleton in-memory store
const vectorStore = new Map<string, SemanticVector>();
const nodeStore = new Map<string, KnowledgeNode>();

export const indexVector = (node: KnowledgeNode, vector: number[]): void => {
    nodeStore.set(node.id, node);
    
    // Calculate magnitude for faster cosine similarity later
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    
    vectorStore.set(node.id, {
        id: node.id,
        dimensions: vector,
        magnitude
    });
};

export const getVectorStore = () => vectorStore;
export const getNodeStore = () => nodeStore;
export const clearVectorIndex = () => {
    vectorStore.clear();
    nodeStore.clear();
};
