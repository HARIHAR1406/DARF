import { WorkerMessage, WorkerActionType } from '../messages/WorkerMessage';
import { WorkerResponse } from '../messages/WorkerResponse';

export const createWorkerMessage = <T>(type: WorkerActionType, payload?: T): WorkerMessage<T> => {
    return {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        payload,
        timestamp: Date.now()
    };
};

export const createWorkerResponse = <T>(messageId: string, type: WorkerActionType, success: boolean, data?: T, error?: string): WorkerResponse<T> => {
    return {
        id: messageId,
        type,
        success,
        data,
        error,
        timestamp: Date.now()
    };
};
