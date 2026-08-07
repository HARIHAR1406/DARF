import { TaskState, TaskPriority } from '../models/TaskState';

export class TaskScheduler {
    private queue: TaskState[] = [];

    public enqueueTask<T>(targetWorker: string, payload: T, priority: TaskPriority = 'NORMAL'): TaskState<T> {
        const task: TaskState<T> = {
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            targetWorker,
            priority,
            status: 'PENDING',
            payload,
            createdAt: Date.now(),
            retries: 0,
            maxRetries: 3
        };
        
        this.queue.push(task);
        this.sortQueue();
        
        return task;
    }

    public dequeueTask(targetWorker: string): TaskState | undefined {
        const index = this.queue.findIndex(t => t.targetWorker === targetWorker && t.status === 'PENDING');
        if (index !== -1) {
            const task = this.queue[index];
            task.status = 'RUNNING';
            task.startedAt = Date.now();
            this.queue.splice(index, 1);
            return task;
        }
        return undefined;
    }

    public failTask(task: TaskState): boolean {
        task.retries += 1;
        if (task.retries >= task.maxRetries) {
            task.status = 'FAILED';
            return false; // Can no longer retry
        }
        
        task.status = 'PENDING'; // Re-queue
        this.queue.push(task);
        this.sortQueue();
        return true; // Scheduled for retry
    }

    private sortQueue(): void {
        const priorityScore = {
            'CRITICAL': 4,
            'HIGH': 3,
            'NORMAL': 2,
            'LOW': 1
        };
        
        // Sort by priority (descending), then by creation time (ascending) for O(log N) equivalent scheduling
        this.queue.sort((a, b) => {
            const scoreDiff = priorityScore[b.priority] - priorityScore[a.priority];
            if (scoreDiff !== 0) return scoreDiff;
            return a.createdAt - b.createdAt;
        });
    }
}

export const taskScheduler = new TaskScheduler();
