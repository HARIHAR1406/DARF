import { WorkflowResult } from '../models/WorkflowResult';
export const validateWorkflow = (result: WorkflowResult): boolean => result.success;
