import { AgentMessage } from '../models/AgentMessage';
import { dispatchEvent } from '../communication/eventDispatcher';

export const handleResponse = (payload: Record<string, unknown> | string): AgentMessage => {
    dispatchEvent('RESPONSE_GENERATED', { type: typeof payload }, 'responseHandler');
    
    return {
        id: `res-${Date.now()}`,
        sessionId: 'session-default',
        type: 'agent_response',
        payload: payload,
        priority: 1,
        timestamp: Date.now()
    };
};
