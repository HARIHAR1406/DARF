export const sanitize = (text: string): string => {
  return text.replace(/[^\w\s.,?!-]/g, '').trim();
};
