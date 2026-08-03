export const parseInstructions = (raw: string): string[] => raw.split(';').map(i => i.trim()).filter(Boolean);
