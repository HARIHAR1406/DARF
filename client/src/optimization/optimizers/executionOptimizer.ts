export class ExecutionOptimizer {
    public async parallelize<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
        // Execute tasks concurrently to reduce latency
        return await Promise.all(tasks.map(task => task()));
    }

    public async executeBalanced<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
        // Simple load balancing: limit concurrency to 3
        const results: T[] = [];
        const concurrencyLimit = 3;
        
        for (let i = 0; i < tasks.length; i += concurrencyLimit) {
            const batch = tasks.slice(i, i + concurrencyLimit);
            const batchResults = await Promise.all(batch.map(t => t()));
            results.push(...batchResults);
        }
        
        return results;
    }
}

export const executionOptimizer = new ExecutionOptimizer();
