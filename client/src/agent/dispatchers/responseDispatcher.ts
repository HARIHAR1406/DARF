import { AgentMessage } from '../models/AgentMessage';
import { handleResponse } from '../handlers/responseHandler';
import { handleError } from '../handlers/errorHandler';

export const dispatchResponse = (payload: Record<string, unknown> | string): AgentMessage => {
    try {
        return handleResponse(payload);
    } catch (error) {
        return handleError(error, 'responseDispatcher');
    }
};
