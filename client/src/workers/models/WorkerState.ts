export type WorkerStatus = 'IDLE' | 'BUSY' | 'ERROR' | 'TERMINATED' | 'INITIALIZING';

export interface WorkerState {
    id: string;
    name: string;
    status: WorkerStatus;
    lastHeartbeat: number;
    tasksProcessed: number;
    errorCount: number;
}
