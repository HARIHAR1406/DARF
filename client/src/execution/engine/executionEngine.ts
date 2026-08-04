import { ExecutionState } from '../models/ExecutionState';
import { WorkflowResult } from '../models/WorkflowResult';
import { runExecution } from '../runners/executionRunner';
import { manageWorkflow } from '../managers/workflowManager';
import { validateWorkflow } from '../validators/workflowValidator';

export class ExecutionEngine {
    public execute(state: ExecutionState): WorkflowResult {
        console.log(state);
        runExecution();
        manageWorkflow();
        
        const result: WorkflowResult = {
            success: true,
            data: 'Executed successfully'
        };
        
        if (!validateWorkflow(result)) {
            throw new Error('Workflow validation failed');
        }
        
        return result;
    }
}
