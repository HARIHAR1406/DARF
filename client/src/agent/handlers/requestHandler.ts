import { AgentMessage } from '../models/AgentMessage';
import { dispatchEvent } from '../communication/eventDispatcher';

export const handleRequest = (payload: string): AgentMessage => {
    // Basic validation and formatting
    if (!payload || payload.trim() === '') {
        throw new Error('Empty request payload');
    }
    
    dispatchEvent('REQUEST_RECEIVED', { length: payload.length }, 'requestHandler');

    return {
        id: `req-${Date.now()}`,
        sessionId: 'session-default',
        type: 'user_request',
        payload: payload,
        priority: 1,
        timestamp: Date.now()
    };
};
