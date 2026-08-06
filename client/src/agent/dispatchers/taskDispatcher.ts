import { AgentMessage } from '../models/AgentMessage';
import { dispatchEvent } from '../communication/eventDispatcher';
import { handleError } from '../handlers/errorHandler';

export const dispatchTask = (taskPayload: Record<string, unknown>): AgentMessage => {
    try {
        if (!taskPayload || Object.keys(taskPayload).length === 0) {
            throw new Error('Invalid task payload');
        }
        
        dispatchEvent('TASK_DISPATCHED', taskPayload, 'taskDispatcher');

        return {
            id: `task-${Date.now()}`,
            sessionId: 'session-default',
            type: 'agent_task',
            payload: taskPayload,
            priority: 2,
            timestamp: Date.now()
        };
    } catch (error) {
        return handleError(error, 'taskDispatcher');
    }
};
