export const extractEntity = (content: string): string[] => {
    // Basic regex-based entity extraction (capitalized words/phrases)
    const entityRegex = /([A-Z][a-z]+(?=\s[A-Z])(?:\s[A-Z][a-z]+)+)|([A-Z][a-z]+)/g;
    const matches = content.match(entityRegex) || [];
    return Array.from(new Set(matches));
};
