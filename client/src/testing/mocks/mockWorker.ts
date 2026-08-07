import { WorkerMessage } from '../../workers/messages/WorkerMessage';
import { WorkerResponse } from '../../workers/messages/WorkerResponse';

/**
 * Mocks the WebWorker API interface for synchronous or single-thread testing
 */
export class MockWorker {
    public onmessage: ((e: MessageEvent<WorkerResponse>) => void) | null = null;
    public onerror: ((e: ErrorEvent) => void) | null = null;
    
    private workerName: string;
    
    constructor(name: string) {
        this.workerName = name;
    }
    
    public postMessage(message: WorkerMessage): void {
        // Simulate immediate worker processing by bouncing back a mock response asynchronously
        setTimeout(() => {
            if (this.onmessage) {
                const response: WorkerResponse = {
                    id: message.id,
                    type: message.type, // Echo back the requested type
                    success: true,
                    timestamp: Date.now(),
                    data: { mockedData: true, workerName: this.workerName }
                };
                
                this.onmessage({ data: response } as MessageEvent);
            }
        }, 10);
    }
    
    public terminate(): void {
        this.onmessage = null;
        this.onerror = null;
    }
}
