export const analyzeStructure = (tokens: string[]): { complexity: number; category: string } => {
  const complexity = Math.min(tokens.length * 2, 100);
  const category = tokens.length > 20 ? 'LONG_FORM' : 'SHORT_FORM';
  return { complexity, category };
};
