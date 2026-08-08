import { KnowledgeNode } from '../models/KnowledgeNode';
import { recoveryManager } from '../../execution/managers/recoveryManager';

const keywordStore = new Map<string, Set<string>>();

export const restoreKeywordState = async () => {
    const recovered = await recoveryManager.restoreCheckpoint<Array<[string, string[]]>>('keywordIndexer');
    if (recovered) {
        recovered.forEach(([k, v]) => keywordStore.set(k, new Set(v)));
    }
};

export const indexKeywords = (node: KnowledgeNode, keywords: string[]): void => {
    keywords.forEach(kw => {
        const lowerKw = kw.toLowerCase();
        if (!keywordStore.has(lowerKw)) {
            keywordStore.set(lowerKw, new Set());
        }
        keywordStore.get(lowerKw)?.add(node.id);
    });
    
    recoveryManager.scheduleCheckpoint('keywordIndexer', () => 
        Array.from(keywordStore.entries()).map(([k, v]) => [k, Array.from(v)])
    );
};

export const getKeywordStore = () => keywordStore;
export const clearKeywordIndex = () => {
    keywordStore.clear();
    recoveryManager.scheduleCheckpoint('keywordIndexer', () => []);
};
