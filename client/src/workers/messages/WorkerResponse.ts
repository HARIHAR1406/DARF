import { WorkerActionType } from './WorkerMessage';

export interface WorkerResponse<T = unknown> {
    id: string; // Must match WorkerMessage id
    type: WorkerActionType;
    success: boolean;
    data?: T;
    error?: string;
    timestamp: number;
    latencyMs?: number;
}
