export const startTimer = (): number => Date.now();
export const endTimer = (start: number): number => Date.now() - start;
