export class BatchingManager {
    private batchQueue: (() => Promise<unknown>)[] = [];
    private isProcessing: boolean = false;
    private readonly batchSize: number = 5;

    public enqueueTask<T>(task: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const wrappedTask = async () => {
                try {
                    const result = await task();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };
            this.batchQueue.push(wrappedTask);
            this.processQueue();
        });
    }

    private async processQueue(): Promise<void> {
        if (this.isProcessing || this.batchQueue.length === 0) return;
        this.isProcessing = true;

        const currentBatch = this.batchQueue.splice(0, this.batchSize);
        await Promise.all(currentBatch.map(t => t()));

        this.isProcessing = false;
        
        if (this.batchQueue.length > 0) {
            this.processQueue();
        }
    }
}

export const batchingManager = new BatchingManager();
