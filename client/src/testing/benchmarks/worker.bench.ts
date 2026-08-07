import { describe, it, expect } from '../utils/testRunner';
import { metricsTracker } from '../performance/metricsTracker';
import { MockWorker } from '../mocks/mockWorker';

describe('Worker Benchmarks', () => {
    it('should process 100 worker messages under 100ms', async () => {
        const worker = new MockWorker('bench-worker');
        
        const start = metricsTracker.startTrack('bench:worker:throughput');
        
        const promises: Promise<void>[] = [];
        let count = 0;
        
        worker.onmessage = () => {
            count++;
        };
        
        for (let i = 0; i < 100; i++) {
            promises.push(new Promise<void>(resolve => {
                const originalOnMessage = worker.onmessage;
                worker.onmessage = (e) => {
                    if (originalOnMessage) originalOnMessage(e);
                    resolve();
                };
                worker.postMessage({ id: `msg-${i}`, type: 'PROCESS', timestamp: Date.now(), payload: {} });
            }));
        }
        
        await Promise.all(promises);
        
        const metric = metricsTracker.endTrack('bench:worker:throughput', start);
        
        expect(count).toEqual(100);
        // Using MockWorker timeout of 10ms, parallel execution should take around 10-20ms total
        expect(metric.durationMs < 100).toBeTruthy();
    });
});
