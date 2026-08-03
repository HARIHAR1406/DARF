export const validateIntegrity = (content: string): boolean => {
  return content.trim().length === content.length;
};
