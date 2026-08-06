import { dispatchEvent } from '../communication/eventDispatcher';

class WorkflowCoordinator {
    public initiateWorkflow(workflowId: string, context: Record<string, unknown>): void {
        dispatchEvent('WORKFLOW_STARTED', { workflowId, context }, 'workflowCoordinator');
    }

    public completeWorkflow(workflowId: string): void {
        dispatchEvent('WORKFLOW_COMPLETED', { workflowId }, 'workflowCoordinator');
    }
}

export const workflowCoordinator = new WorkflowCoordinator();
