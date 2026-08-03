export const tokenize = (text: string): string[] => {
  return text.trim().toLowerCase().split(/\s+/).filter(Boolean);
};
