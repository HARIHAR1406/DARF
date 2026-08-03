export const buildContextPrompt = (context: string[]): string => {
  return `Context Information:\n${[...new Set(context)].join('\n')}`;
};
