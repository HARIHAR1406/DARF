export const calculateAverage = (times: number[]): number => times.length ? times.reduce((a,b) => a+b, 0) / times.length : 0;
