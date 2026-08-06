import { AgentState } from '../models/AgentState';
import { AgentMessage } from '../models/AgentMessage';
import { dispatchRequest } from '../dispatchers/requestDispatcher';
import { agentManager } from '../managers/agentManager';
import { workflowCoordinator } from '../coordinators/workflowCoordinator';

export class AgentEngine {
    public processMessage(state: AgentState, userPayload: string): AgentMessage {
        // Validation check
        if (!state.isActive || !state.id) {
            throw new Error('Agent validation failed: Invalid state');
        }

        // Register/update state
        agentManager.updateAgentStatus(state.id, 'processing');

        // Initiate high-level workflow via coordinator
        workflowCoordinator.initiateWorkflow(`wf-${state.id}-${Date.now()}`, { payload: userPayload });

        // Dispatch request (this sends it into the execution pipeline event flow)
        const message = dispatchRequest(userPayload);
        
        agentManager.updateAgentStatus(state.id, 'idle');
        
        return message;
    }
}
