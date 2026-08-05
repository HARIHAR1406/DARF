// Map of Keyword -> Set of Node IDs
const keywordIndex = new Map<string, Set<string>>();

export const indexKeywords = (nodeId: string, keywords: string[]): void => {
    keywords.forEach(keyword => {
        const lowerKw = keyword.toLowerCase();
        if (!keywordIndex.has(lowerKw)) {
            keywordIndex.set(lowerKw, new Set());
        }
        keywordIndex.get(lowerKw)!.add(nodeId);
    });
};

export const getKeywordIndex = () => keywordIndex;
export const clearKeywordIndex = () => keywordIndex.clear();
