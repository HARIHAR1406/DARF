import { ExecutionState } from '../models/ExecutionState';
export const validateState = (state: ExecutionState): boolean => !!state.status;
