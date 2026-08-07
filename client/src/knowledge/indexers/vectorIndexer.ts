import { KnowledgeNode } from '../models/KnowledgeNode';
import { SemanticVector } from '../models/SemanticVector';
import { syncManager } from '../../execution/managers/syncManager';
import { recoveryManager } from '../../execution/managers/recoveryManager';

// L1 Cache (In-Memory)
const vectorStore = new Map<string, SemanticVector>();
const nodeStore = new Map<string, KnowledgeNode>();

// Recovery hook
export const restoreVectorState = async () => {
    const recoveredVectors = await recoveryManager.restoreCheckpoint<Array<[string, SemanticVector]>>('vectorIndexer_vectors');
    const recoveredNodes = await recoveryManager.restoreCheckpoint<Array<[string, KnowledgeNode]>>('vectorIndexer_nodes');
    
    if (recoveredVectors) {
        recoveredVectors.forEach(([k, v]) => vectorStore.set(k, v));
    }
    if (recoveredNodes) {
        recoveredNodes.forEach(([k, v]) => nodeStore.set(k, v));
    }
};

export const indexVector = (node: KnowledgeNode, vector: number[]): void => {
    nodeStore.set(node.id, node);
    
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    
    const semanticVector: SemanticVector = {
        id: node.id,
        dimensions: vector,
        magnitude
    };
    
    vectorStore.set(node.id, semanticVector);
    
    // Background synchronization to L2 storage (LocalStorage)
    syncManager.queueWrite('knowledge', `vectorNode_${node.id}`, node);
    syncManager.queueWrite('knowledge', `vector_${node.id}`, semanticVector);
    
    // Create checkpoints for fast recovery
    recoveryManager.createCheckpoint('vectorIndexer_vectors', Array.from(vectorStore.entries()));
    recoveryManager.createCheckpoint('vectorIndexer_nodes', Array.from(nodeStore.entries()));
};

export const getVectorStore = () => vectorStore;
export const getNodeStore = () => nodeStore;
export const clearVectorIndex = () => {
    vectorStore.clear();
    nodeStore.clear();
    recoveryManager.createCheckpoint('vectorIndexer_vectors', []);
    recoveryManager.createCheckpoint('vectorIndexer_nodes', []);
};
