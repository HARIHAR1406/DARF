export const buildDeveloperPrompt = (instructions: string[], rules: string[]): string => {
  return `Developer Instructions:\n${instructions.join('\n')}\nRules:\n${rules.join('\n')}`;
};
