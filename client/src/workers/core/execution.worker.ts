import { WorkerMessage } from '../messages/WorkerMessage';
import { createWorkerResponse } from '../utils/workerHelpers';
import { ExecutionEngine } from '../../execution/engine/executionEngine';
import { ExecutionState } from '../../execution/models/ExecutionState';

interface ExecutionPayload {
    state: ExecutionState;
    userRequest: string;
}

const engine = new ExecutionEngine();

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
            const payload = msg.payload as ExecutionPayload;
            const result = engine.execute(payload.state, payload.userRequest);
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
