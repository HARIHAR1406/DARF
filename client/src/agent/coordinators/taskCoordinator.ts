import { dispatchTask } from '../dispatchers/taskDispatcher';

class TaskCoordinator {
    public createTask(payload: Record<string, unknown>): string {
        const msg = dispatchTask(payload);
        return msg.id;
    }
}

export const taskCoordinator = new TaskCoordinator();

// Stub for backward compatibility until refactored completely
export const coordinateTask = (): void => {
    // legacy compat
};
