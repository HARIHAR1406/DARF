class ExecutionManager {
    private activeExecutions: Set<string> = new Set();
    
    public startExecution(executionId: string): void {
        this.activeExecutions.add(executionId);
    }
    
    public endExecution(executionId: string): void {
        this.activeExecutions.delete(executionId);
    }
    
    public isExecuting(executionId: string): boolean {
        return this.activeExecutions.has(executionId);
    }
}

export const executionManager = new ExecutionManager();
