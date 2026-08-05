import { OrchestrationEngine } from '../engine/orchestrationEngine';
import { ExecutionResult } from '../models/ExecutionResult';

class OrchestrationService {
    private engine = new OrchestrationEngine();

    public async processRequest(request: string): Promise<ExecutionResult> {
        return await this.engine.execute(request);
    }
}

export const orchestrationService = new OrchestrationService();
