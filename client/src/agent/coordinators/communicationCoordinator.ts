import { channelManager } from '../communication/channelManager';

class CommunicationCoordinator {
    public establishCommunication(channelId: string, agentId: string): void {
        channelManager.createChannel(channelId);
        channelManager.subscribe(channelId, agentId);
    }
}

export const communicationCoordinator = new CommunicationCoordinator();
