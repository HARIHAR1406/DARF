export interface WorkflowRecord {
    id: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    startTime: number;
    endTime?: number;
    context: Record<string, unknown>;
}

class WorkflowManager {
    private workflows: Map<string, WorkflowRecord> = new Map();

    public registerWorkflow(id: string, context: Record<string, unknown>): WorkflowRecord {
        const wf: WorkflowRecord = {
            id,
            status: 'pending',
            startTime: Date.now(),
            context
        };
        this.workflows.set(id, wf);
        return wf;
    }

    public updateStatus(id: string, status: WorkflowRecord['status']): void {
        const wf = this.workflows.get(id);
        if (wf) {
            wf.status = status;
            if (status === 'completed' || status === 'failed') {
                wf.endTime = Date.now();
            }
        }
    }

    public getWorkflow(id: string): WorkflowRecord | undefined {
        return this.workflows.get(id);
    }
}

export const workflowManager = new WorkflowManager();

// Stub for backward compatibility
export const manageWorkflow = (): void => {
    // legacy compat
};
