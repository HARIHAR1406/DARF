import { AgentState } from '../models/AgentState';
import { lifecycleManager } from './lifecycleManager';

class AgentManager {
    private agents: Map<string, AgentState> = new Map();

    public registerAgent(id: string): AgentState {
        const state = lifecycleManager.initializeAgent(id);
        this.agents.set(id, state);
        return state;
    }

    public getAgent(id: string): AgentState | undefined {
        return this.agents.get(id);
    }
    
    public updateAgentStatus(id: string, status: AgentState['status'], currentTask?: string): void {
        const agent = this.agents.get(id);
        if (agent) {
            agent.status = status;
            if (currentTask !== undefined) {
                agent.currentTask = currentTask;
            }
        }
    }
}

export const agentManager = new AgentManager();

// Stub for backward compatibility until refactored completely
export const manageAgent = (): void => {
    // legacy compat
};
