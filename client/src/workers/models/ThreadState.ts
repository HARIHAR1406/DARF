export interface ThreadState {
    threadId: string;
    activeTasks: string[]; // Task IDs
    memoryUsageEstimateBytes: number;
    isStalled: boolean;
}
