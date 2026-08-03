import { ContextEntry } from '../models/ContextEntry';

export const validateContext = (entry: ContextEntry): boolean => {
    return !!(entry.id && entry.content && entry.timestamp);
};
