import { AgentEngine } from '../engine/agentEngine';
import { AgentState } from '../models/AgentState';
import { AgentMessage } from '../models/AgentMessage';

class AgentService {
    private engine: AgentEngine;

    constructor() {
        this.engine = new AgentEngine();
    }

    public execute(state: AgentState, userPayload: string): AgentMessage {
        return this.engine.processMessage(state, userPayload);
    }
}

export const agentService = new AgentService();
