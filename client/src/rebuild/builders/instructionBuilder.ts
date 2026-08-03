export const buildInstructions = (rules: string[]): string[] => {
  return rules.map((r, i) => `${i + 1}. ${r}`);
};
