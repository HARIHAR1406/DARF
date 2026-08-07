interface PrioritizedTask<T> {
    priority: number;
    task: () => Promise<T>;
    resolve: (val: T) => void;
    reject: (err: unknown) => void;
}

export class PrioritizationManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private queue: PrioritizedTask<any>[] = [];
    private isProcessing: boolean = false;

    public enqueue<T>(priority: number, task: () => Promise<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.queue.push({ priority, task, resolve, reject });
            this.queue.sort((a, b) => b.priority - a.priority); // High priority first
            this.processNext();
        });
    }

    private async processNext(): Promise<void> {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;
        
        const item = this.queue.shift();
        if (item) {
            try {
                const result = await item.task();
                item.resolve(result);
            } catch (err) {
                item.reject(err);
            }
        }
        
        this.isProcessing = false;
        if (this.queue.length > 0) {
            this.processNext();
        }
    }
}

export const prioritizationManager = new PrioritizationManager();
