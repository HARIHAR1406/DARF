import { dispatchEvent } from '../communication/eventDispatcher';
import { AgentMessage } from '../models/AgentMessage';

export const handleError = (error: unknown, context?: string): AgentMessage => {
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    dispatchEvent('EXECUTION_ERROR', { error: errorMsg, context }, 'errorHandler');
    
    return {
        id: `err-${Date.now()}`,
        sessionId: 'session-default',
        type: 'error',
        payload: {
            message: errorMsg,
            context
        },
        priority: 0,
        timestamp: Date.now()
    };
};
