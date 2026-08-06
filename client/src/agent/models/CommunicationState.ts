export interface CommunicationState {
    channelId: string;
    subscribers: string[];
    messageCount: number;
    lastActive: number;
}
