import { OrchestrationEngine } from '../engine/orchestrationEngine';
import { ExecutionResult } from '../models/ExecutionResult';

class OrchestrationService {
    private engine = new OrchestrationEngine();

    public processRequest(request: string): ExecutionResult {
        return this.engine.execute(request);
    }
}

export const orchestrationService = new OrchestrationService();
