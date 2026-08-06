import { CommunicationState } from '../models/CommunicationState';

class ChannelManager {
    private channels: Map<string, CommunicationState> = new Map();

    public createChannel(channelId: string): void {
        if (!this.channels.has(channelId)) {
            this.channels.set(channelId, {
                channelId,
                subscribers: [],
                messageCount: 0,
                lastActive: Date.now()
            });
        }
    }

    public subscribe(channelId: string, subscriberId: string): void {
        const channel = this.channels.get(channelId);
        if (channel && !channel.subscribers.includes(subscriberId)) {
            channel.subscribers.push(subscriberId);
            channel.lastActive = Date.now();
        }
    }

    public trackMessage(channelId: string): void {
        const channel = this.channels.get(channelId);
        if (channel) {
            channel.messageCount++;
            channel.lastActive = Date.now();
        }
    }
}

export const channelManager = new ChannelManager();
