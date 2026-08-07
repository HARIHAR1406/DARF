export type TaskPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface TaskState<T = unknown> {
    id: string;
    targetWorker: string;
    priority: TaskPriority;
    status: TaskStatus;
    payload: T;
    createdAt: number;
    startedAt?: number;
    completedAt?: number;
    retries: number;
    maxRetries: number;
}
