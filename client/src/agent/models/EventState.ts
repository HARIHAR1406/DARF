export interface EventState {
    eventId: string;
    eventType: string;
    payload: Record<string, unknown> | string;
    source: string;
    timestamp: number;
}
