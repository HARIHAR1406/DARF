import { ExecutionEngine } from '../engine/executionEngine';
import { ExecutionState } from '../models/ExecutionState';
import { WorkflowResult } from '../models/WorkflowResult';

class ExecutionService {
    private engine = new ExecutionEngine();

    public processExecution(state: ExecutionState): WorkflowResult {
        return this.engine.execute(state);
    }
}

export const executionService = new ExecutionService();
