export const buildSystemPrompt = (rules: string[], constraints: string[]): string => {
  return `System Rules:\n${rules.join('\n')}\nConstraints:\n${constraints.join('\n')}`;
};
