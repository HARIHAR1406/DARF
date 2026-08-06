export interface AgentState {
    id: string;
    isActive: boolean;
    status: 'idle' | 'processing' | 'error' | 'terminated';
    currentTask?: string;
    metadata: Record<string, unknown>;
}
