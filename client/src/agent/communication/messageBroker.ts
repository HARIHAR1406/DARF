import { AgentMessage } from '../models/AgentMessage';

class MessageBroker {
    private queues: Map<string, AgentMessage[]> = new Map();

    public publishMessage(channel: string, message: AgentMessage): void {
        if (!this.queues.has(channel)) {
            this.queues.set(channel, []);
        }
        this.queues.get(channel)?.push(message);
    }

    public consumeMessages(channel: string): AgentMessage[] {
        const messages = this.queues.get(channel) || [];
        this.queues.set(channel, []); // Clear after consumption
        return messages;
    }
}

export const messageBroker = new MessageBroker();

// Stub for backward compatibility until refactored completely
export const brokerMessage = (): void => {
    // legacy compat
};
