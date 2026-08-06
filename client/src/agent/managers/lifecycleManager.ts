import { dispatchEvent } from '../communication/eventDispatcher';
import { AgentState } from '../models/AgentState';

class LifecycleManager {
    public initializeAgent(id: string): AgentState {
        const state: AgentState = {
            id,
            isActive: true,
            status: 'idle',
            metadata: { created: Date.now() }
        };
        dispatchEvent('AGENT_INITIALIZED', { agentId: id }, 'lifecycleManager');
        return state;
    }

    public terminateAgent(state: AgentState): AgentState {
        state.isActive = false;
        state.status = 'terminated';
        dispatchEvent('AGENT_TERMINATED', { agentId: state.id }, 'lifecycleManager');
        return state;
    }
    
    public suspendAgent(state: AgentState): AgentState {
        state.status = 'idle';
        dispatchEvent('AGENT_SUSPENDED', { agentId: state.id }, 'lifecycleManager');
        return state;
    }
}

export const lifecycleManager = new LifecycleManager();
