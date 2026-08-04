import { ExecutionState } from '../models/ExecutionState';
export const validateExecution = (state: ExecutionState): boolean => !!state.id;
