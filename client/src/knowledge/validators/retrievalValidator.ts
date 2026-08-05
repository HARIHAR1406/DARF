import { RetrievalResult } from '../models/RetrievalResult';

export const validateRetrieval = (result: Partial<RetrievalResult>): boolean => {
    if (!result) return false;
    if (typeof result.score !== 'number' || result.score < 0) return false;
    if (!result.content || typeof result.content !== 'string') return false;
    return true;
};
