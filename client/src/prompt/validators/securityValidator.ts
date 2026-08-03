export const validateSecurity = (content: string): boolean => {
  return !content.includes('DROP TABLE') && !content.includes('RM -RF');
};
