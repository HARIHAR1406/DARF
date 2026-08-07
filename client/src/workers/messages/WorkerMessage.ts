export type WorkerActionType = 'INITIALIZE' | 'START' | 'STOP' | 'RESTART' | 'PROCESS' | 'HEARTBEAT' | 'TERMINATE' | 'RECOVER';

export interface WorkerMessage<T = unknown> {
    id: string; // Correlation ID
    type: WorkerActionType;
    payload?: T;
    timestamp: number;
}
