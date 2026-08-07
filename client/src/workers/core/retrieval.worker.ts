import { WorkerMessage } from '../messages/WorkerMessage';
import { createWorkerResponse } from '../utils/workerHelpers';
import { retrieveByVector } from '../../knowledge/retrievers/vectorRetriever';

interface RetrievalPayload {
    content: string;
    threshold?: number;
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const msg = e.data;
    const startTime = performance.now();

    try {
        if (msg.type === 'HEARTBEAT') {
            self.postMessage(createWorkerResponse(msg.id, msg.type, true));
            return;
        }

        if (msg.type === 'INITIALIZE') {
            self.postMessage(createWorkerResponse(msg.id, msg.type, true));
            return;
        }

        if (msg.type === 'PROCESS') {
            const payload = msg.payload as RetrievalPayload;
            const result = retrieveByVector(payload.content, payload.threshold);
            const latencyMs = performance.now() - startTime;
            
            const response = createWorkerResponse(msg.id, msg.type, true, result);
            response.latencyMs = latencyMs;
            self.postMessage(response);
            return;
        }
        
        self.postMessage(createWorkerResponse(msg.id, msg.type, false, null, 'Unsupported message type'));
    } catch (error: unknown) {
        const msgStr = error instanceof Error ? error.message : 'Unknown error';
        self.postMessage(createWorkerResponse(msg.id, msg.type, false, null, msgStr));
    }
};
