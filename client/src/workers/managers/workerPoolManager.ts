import { workerManager } from './workerManager';
import { messageManager } from './messageManager';
import { taskScheduler } from '../utils/taskScheduler';
import { createWorkerMessage } from '../utils/workerHelpers';

class WorkerPoolManager {
    public async dispatchTask<T, R>(workerName: string, payload: T): Promise<R> {
        // Enqueue the task for scheduling (simulates priority pooling)
        taskScheduler.enqueueTask<T>(workerName, payload, 'NORMAL');
        
        // Wait for worker readiness (mock scheduling hook)
        const activeWorker = workerManager.getWorker(workerName);
        if (!activeWorker) {
            throw new Error(`Worker ${workerName} not found or not initialized`);
        }
        
        const workerState = workerManager.getWorkerState(workerName);
        if (workerState && workerState.status === 'ERROR') {
            throw new Error(`Worker ${workerName} is in ERROR state`);
        }
        
        if (workerState) {
            workerState.status = 'BUSY';
            workerState.activeTasks = (workerState.activeTasks || 0) + 1;
        }

        // Dequeue precisely the task we scheduled
        const dequeued = taskScheduler.dequeueTask(workerName);

        const message = createWorkerMessage<T>('PROCESS', dequeued?.payload as T);
        
        const responsePromise = messageManager.registerPendingMessage(message.id);
        
        activeWorker.postMessage(message);
        
        try {
            const response = await responsePromise;
            if (workerState) {
                workerState.activeTasks = Math.max(0, workerState.activeTasks - 1);
                if (workerState.activeTasks === 0) {
                    workerState.status = 'IDLE';
                }
            }
            if (!response.success) {
                throw new Error(response.error || 'Unknown worker error');
            }
            return response.data as R;
        } catch (error) {
            if (workerState) {
                workerState.activeTasks = Math.max(0, workerState.activeTasks - 1);
                if (workerState.activeTasks === 0) {
                    workerState.status = 'IDLE';
                }
            }
            throw error;
        }
    }
}

export const workerPoolManager = new WorkerPoolManager();
