export const buildUserPrompt = (intent: string, input: string): string => {
  return `Intent: ${intent}\nInput: ${input}`;
};
