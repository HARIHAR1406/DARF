import { AgentMessage } from '../models/AgentMessage';
import { handleRequest } from '../handlers/requestHandler';
import { handleError } from '../handlers/errorHandler';

export const dispatchRequest = (request: string): AgentMessage => {
    try {
        return handleRequest(request);
    } catch (error) {
        return handleError(error, 'requestDispatcher');
    }
};
