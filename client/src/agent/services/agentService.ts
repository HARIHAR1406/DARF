import { AgentEngine } from '../engine/agentEngine';
import { AgentState } from '../models/AgentState';
import { AgentMessage } from '../models/AgentMessage';

class AgentService {
    private engine = new AgentEngine();

    public execute(state: AgentState): AgentMessage {
        return this.engine.processMessage(state);
    }
}

export const agentService = new AgentService();
