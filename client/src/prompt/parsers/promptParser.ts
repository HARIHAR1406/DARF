export const parsePrompt = (raw: string): string[] => raw.split('\n').filter(Boolean);
