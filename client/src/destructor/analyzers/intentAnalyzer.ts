import { Intent } from '../models/Intent';

export const analyzeIntent = (tokens: string[]): Intent => {
  const text = tokens.join(' ');
  if (text.includes('code') || text.includes('function')) return Intent.CODING;
  if (text.includes('search') || text.includes('find')) return Intent.SEARCH;
  if (text.includes('destroy') || text.includes('destructor')) return Intent.DESTRUCTOR;
  if (text.includes('rebuild')) return Intent.REBUILD;
  if (text.includes('analyze')) return Intent.ANALYSIS;
  if (tokens.length > 0) return Intent.CHAT;
  return Intent.UNKNOWN;
};
