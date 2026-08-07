import { workerManager } from '../managers/workerManager';
import { workerPoolManager } from '../managers/workerPoolManager';

class WorkerService {
    private isInitialized = false;

    public async initialize(): Promise<void> {
        if (this.isInitialized) return;
        
        if (typeof window !== 'undefined' && window.Worker) {
            // Instantiate WebWorkers
            const knowledgeWorker = new Worker(new URL('../core/knowledge.worker', import.meta.url), { type: 'module' });
            const learningWorker = new Worker(new URL('../core/learning.worker', import.meta.url), { type: 'module' });
            const optimizationWorker = new Worker(new URL('../core/optimization.worker', import.meta.url), { type: 'module' });
            const executionWorker = new Worker(new URL('../core/execution.worker', import.meta.url), { type: 'module' });
            const retrievalWorker = new Worker(new URL('../core/retrieval.worker', import.meta.url), { type: 'module' });

            workerManager.registerWorker('knowledge', knowledgeWorker);
            workerManager.registerWorker('learning', learningWorker);
            workerManager.registerWorker('optimization', optimizationWorker);
            workerManager.registerWorker('execution', executionWorker);
            workerManager.registerWorker('retrieval', retrievalWorker);

            // Send INITIALIZE messages to boot up in-worker databases/states
            await Promise.all([
                workerPoolManager.dispatchTask('knowledge', { type: 'INITIALIZE' }),
                workerPoolManager.dispatchTask('learning', { type: 'INITIALIZE' }),
                workerPoolManager.dispatchTask('optimization', { type: 'INITIALIZE' }),
                workerPoolManager.dispatchTask('execution', { type: 'INITIALIZE' }),
                workerPoolManager.dispatchTask('retrieval', { type: 'INITIALIZE' })
            ]);

            this.isInitialized = true;
            console.log('WorkerService initialized successfully.');
        } else {
            console.warn('WebWorkers are not supported in this environment.');
        }
    }

    public async executeTask<T, R>(workerName: string, payload: T): Promise<R> {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return workerPoolManager.dispatchTask<T, R>(workerName, payload);
    }
}

export const workerService = new WorkerService();
