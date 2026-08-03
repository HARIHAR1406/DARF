import { BenchmarkResult } from '../models/BenchmarkResult';
export const validatePerformance = (result: BenchmarkResult): boolean => result.averageTime >= 0;
