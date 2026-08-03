import { TestResult } from '../models/TestResult';
export const validateTest = (result: TestResult): boolean => result.success;
