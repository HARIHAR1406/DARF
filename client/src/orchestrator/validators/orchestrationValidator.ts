import { ExecutionResult } from '../models/ExecutionResult';
export const validateOrchestration = (result: ExecutionResult): boolean => result.success;
