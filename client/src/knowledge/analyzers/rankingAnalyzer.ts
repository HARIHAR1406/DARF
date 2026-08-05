import { RetrievalResult } from '../models/RetrievalResult';

export const rankResults = (results: RetrievalResult[]): RetrievalResult[] => {
    return results.sort((a, b) => b.score - a.score);
};
