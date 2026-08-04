import { RetrievalResult } from '../models/RetrievalResult';
export const validateRetrieval = (result: RetrievalResult): boolean => result.score > 0;
