export const buildPrompt = (context: string, instructions: string[]): string => {
  return `${context}\n\nInstructions:\n${instructions.join('\n')}`;
};
