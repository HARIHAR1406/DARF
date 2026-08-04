import { WorkflowState } from '../models/WorkflowState';
export const validateWorkflow = (state: WorkflowState): boolean => !!state.status;
