import { ExecutionState } from '../models/ExecutionState';
import { WorkflowResult } from '../models/WorkflowResult';
import { executionManager } from '../managers/executionManager';
import { workflowManager } from '../managers/workflowManager';
import { validateWorkflow } from '../validators/workflowValidator';

export class ExecutionEngine {
    public execute(state: ExecutionState, payload?: string): WorkflowResult {
        if (!state.isActive || !state.id) {
            throw new Error('Execution validation failed: Invalid state');
        }

        executionManager.startExecution(state.id);
        
        const wf = workflowManager.registerWorkflow(`wf-${state.id}`, { payload });
        workflowManager.updateStatus(wf.id, 'running');

        // Simulate execution runner completion
        workflowManager.updateStatus(wf.id, 'completed');
        
        const result: WorkflowResult = {
            success: true,
            data: payload || 'Executed successfully'
        };
        
        if (!validateWorkflow(result)) {
            executionManager.endExecution(state.id);
            throw new Error('Workflow validation failed');
        }
        
        executionManager.endExecution(state.id);
        
        return result;
    }
}
