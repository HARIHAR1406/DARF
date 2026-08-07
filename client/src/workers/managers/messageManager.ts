import { WorkerResponse } from '../messages/WorkerResponse';

type MessageResolver = (response: WorkerResponse) => void;
type MessageRejecter = (error: Error) => void;

class MessageManager {
    private pendingMessages = new Map<string, { resolve: MessageResolver, reject: MessageRejecter, timer: number }>();
    private readonly timeoutMs = 30000; // 30 seconds max execution time for a worker task

    public registerPendingMessage(messageId: string): Promise<WorkerResponse> {
        return new Promise((resolve, reject) => {
            const timer = window.setTimeout(() => {
                this.rejectMessage(messageId, new Error('Worker response timeout'));
            }, this.timeoutMs);

            this.pendingMessages.set(messageId, { resolve, reject, timer });
        });
    }

    public resolveMessage(response: WorkerResponse): void {
        const pending = this.pendingMessages.get(response.id);
        if (pending) {
            clearTimeout(pending.timer);
            this.pendingMessages.delete(response.id);
            pending.resolve(response);
        }
    }

    public rejectMessage(messageId: string, error: Error): void {
        const pending = this.pendingMessages.get(messageId);
        if (pending) {
            clearTimeout(pending.timer);
            this.pendingMessages.delete(messageId);
            pending.reject(error);
        }
    }
}

export const messageManager = new MessageManager();
