import { MemoryEntry } from '../models/MemoryEntry';

export const validateMemory = (entry: MemoryEntry): boolean => {
    return !!(entry.id && entry.content && typeof entry.score === 'number');
};
