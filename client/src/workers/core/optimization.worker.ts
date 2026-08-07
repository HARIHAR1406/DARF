import { WorkerMessage } from '../messages/WorkerMessage';
import { createWorkerResponse } from '../utils/workerHelpers';
import { OptimizationEngine } from '../../optimization/engine/optimizationEngine';
import { ProviderRequest } from '../../provider/models/ProviderRequest';
import { ProviderResponse } from '../../provider/models/ProviderResponse';

interface OptimizationPayload {
    action: 'pre' | 'post' | 'cache';
    request: ProviderRequest;
    response?: ProviderResponse;
}

const engine = new OptimizationEngine();

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const msg = e.data;
    const startTime = performance.now();

    try {
        if (msg.type === 'HEARTBEAT') {
            self.postMessage(createWorkerResponse(msg.id, msg.type, true));
            return;
        }

        if (msg.type === 'INITIALIZE') {
            // Check optimization service initialize if it exists (it's sync right now but we wrap it in a promise)
            self.postMessage(createWorkerResponse(msg.id, msg.type, true));
            return;
        }

        if (msg.type === 'PROCESS') {
            const payload = msg.payload as OptimizationPayload;
            let result;
            
            if (payload.action === 'pre') {
                result = engine.optimizePreExecution(payload.request);
            } else if (payload.action === 'post') {
                if (!payload.response) throw new Error('Response is required for post-execution optimization');
                result = engine.optimizePostExecution(payload.request, payload.response);
            } else if (payload.action === 'cache') {
                result = engine.checkCache(payload.request);
            }
            
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
