export interface AgentMessage {
    id: string;
    sessionId: string;
    type: string;
    payload: Record<string, unknown> | string;
    priority: number;
    timestamp: number;
}
