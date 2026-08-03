export const buildMemoryPrompt = (history: string[]): string => {
  return `Memory Context:\n${history.join('\n')}`;
};
