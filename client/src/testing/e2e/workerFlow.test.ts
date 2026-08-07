import { describe, it, expect } from '../utils/testRunner';
import { MockWorker } from '../mocks/mockWorker';

describe('Worker Flow E2E', () => {
    it('should communicate and resolve asynchronously via mock', async () => {
        const worker = new MockWorker('e2e-worker');
        
        let resolvedData: unknown = null;
        
        worker.onmessage = (e) => {
            resolvedData = e.data;
        };
        
        worker.postMessage({ id: 'test-id', type: 'PROCESS', timestamp: Date.now(), payload: {} });
        
        // Wait for mock async bounce
        await new Promise(r => setTimeout(r, 20));
        
        expect(resolvedData).toBeTruthy();
        expect((resolvedData as Record<string, unknown>).type).toEqual('PROCESS');
    });
});
