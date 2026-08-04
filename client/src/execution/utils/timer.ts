export const startExecutionTimer = (): number => Date.now();
export const endExecutionTimer = (start: number): number => Date.now() - start;
