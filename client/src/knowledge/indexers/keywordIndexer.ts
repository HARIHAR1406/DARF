import { KnowledgeNode } from '../models/KnowledgeNode';
import { recoveryManager } from '../../execution/managers/recoveryManager';

const keywordStore = new Map<string, Set<string>>();

const restoreState = () => {
    const recovered = recoveryManager.restoreCheckpoint<Array<[string, string[]]>>('keywordIndexer');
    if (recovered) {
        recovered.forEach(([k, v]) => keywordStore.set(k, new Set(v)));
    }
};
restoreState();

export const indexKeywords = (node: KnowledgeNode, keywords: string[]): void => {
    keywords.forEach(kw => {
        const lowerKw = kw.toLowerCase();
        if (!keywordStore.has(lowerKw)) {
            keywordStore.set(lowerKw, new Set());
        }
        keywordStore.get(lowerKw)?.add(node.id);
    });
    
    const serialized = Array.from(keywordStore.entries()).map(([k, v]) => [k, Array.from(v)]);
    recoveryManager.createCheckpoint('keywordIndexer', serialized);
};

export const getKeywordStore = () => keywordStore;
export const clearKeywordIndex = () => {
    keywordStore.clear();
    recoveryManager.createCheckpoint('keywordIndexer', []);
};
