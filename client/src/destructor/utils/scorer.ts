export const calculateScore = (base: number, weight: number): number => {
  return Math.min(Math.max(base * weight, 0), 100);
};
