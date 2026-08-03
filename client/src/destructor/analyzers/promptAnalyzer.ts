import { analyzeIntent } from './intentAnalyzer';
import { analyzeSecurity } from './securityAnalyzer';
import { analyzeStructure } from './structureAnalyzer';
import { tokenize } from '../utils/tokenizer';
import { sanitize } from '../utils/sanitizer';
import { PromptAnalysis } from '../models/PromptAnalysis';

export const analyzePrompt = (prompt: string): Omit<PromptAnalysis, 'id' | 'timestamp'> => {
  const sanitized = sanitize(prompt);
  const tokens = tokenize(sanitized);
  
  const intent = analyzeIntent(tokens);
  const riskLevel = analyzeSecurity(tokens);
  const { complexity, category } = analyzeStructure(tokens);
  
  return {
    prompt: sanitized,
    tokens,
    intent,
    category,
    complexity,
    confidence: 85, // Mock baseline confidence
    riskLevel,
    metadata: {
      originalLength: prompt.length,
      sanitizedLength: sanitized.length
    }
  };
};
