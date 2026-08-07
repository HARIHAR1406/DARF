import { WorkerMessage } from '../messages/WorkerMessage';
import { createWorkerResponse } from '../utils/workerHelpers';
import { KnowledgeEngine } from '../../knowledge/engine/knowledgeEngine';
import { knowledgeService } from '../../knowledge/services/knowledgeService';
import { KnowledgeNode } from '../../knowledge/models/KnowledgeNode';

interface KnowledgePayload {
    node: KnowledgeNode;
}

const engine = new KnowledgeEngine();

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const msg = e.data;
    const startTime = performance.now();

    try {
        if (msg.type === 'HEARTBEAT') {
            self.postMessage(createWorkerResponse(msg.id, msg.type, true));
            return;
        }

        if (msg.type === 'INITIALIZE') {
            await knowledgeService.initialize(); // Uses IndexedDB
            self.postMessage(createWorkerResponse(msg.id, msg.type, true));
            return;
        }

        if (msg.type === 'PROCESS') {
            const payload = msg.payload as KnowledgePayload;
            const result = engine.execute(payload.node); // payload is { node: KnowledgeNode }
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
