import { WorkerState } from '../models/WorkerState';
import { messageManager } from './messageManager';
import { WorkerResponse } from '../messages/WorkerResponse';
import { SecurityValidator } from '../../security/validators/securityValidator';
import { securityManager } from '../../security/managers/securityManager';
import { telemetryService } from '../../telemetry/services/telemetryService';

class WorkerManager {
    private workers = new Map<string, Worker>();
    private states = new Map<string, WorkerState>();
    private heartbeatTimers = new Map<string, number>();

    public registerWorker(name: string, workerInstance: Worker): void {
        this.workers.set(name, workerInstance);
        
        this.states.set(name, {
            id: `wkr-${name}-${Date.now()}`,
            name,
            status: 'INITIALIZING',
            lastHeartbeat: Date.now(),
            tasksProcessed: 0,
            errorCount: 0,
            activeTasks: 0
        });

        telemetryService.trackEvent('WORKER', 'WorkerManager', 'registerWorker', 'SUCCESS', 'INFO', undefined, { name });

        workerInstance.onmessage = (e: MessageEvent<WorkerResponse>) => {
            const response = e.data;
            
            // Security Validation for Boundary
            const validation = SecurityValidator.validateWorkerMessage(response.type, response.data);
            if (!validation.isValid) {
                console.error(`Security blocked unsafe worker response from ${name}`);
                securityManager.incrementBlockedRequests();
                messageManager.rejectMessage(response.id, new Error('Security boundary violation from worker'));
                return;
            }
            
            if (response.type === 'HEARTBEAT') {
                this.updateHeartbeat(name);
            } else {
                this.states.get(name)!.tasksProcessed++;
                messageManager.resolveMessage(response);
            }
        };

        workerInstance.onerror = (e) => {
            console.error(`Worker error [${name}]:`, e);
            const state = this.states.get(name);
            if (state) {
                state.errorCount++;
                state.status = 'ERROR';
                telemetryService.trackError('WORKER', 'WorkerManager', 'workerError', e instanceof Error ? e : new Error(String(e)));
            }
        };
        
        this.startHeartbeatMonitor(name);
    }

    public getWorker(name: string): Worker | undefined {
        return this.workers.get(name);
    }
    
    public getWorkerState(name: string): WorkerState | undefined {
        return this.states.get(name);
    }

    private updateHeartbeat(name: string): void {
        const state = this.states.get(name);
        if (state) {
            state.lastHeartbeat = Date.now();
            if (state.status === 'INITIALIZING') {
                state.status = 'IDLE';
            }
        }
    }

    private startHeartbeatMonitor(name: string): void {
        const timerId = window.setInterval(() => {
            const state = this.states.get(name);
            if (state) {
                const now = Date.now();
                if (now - state.lastHeartbeat > 10000) { // 10 seconds without heartbeat
                    console.warn(`Worker ${name} missed heartbeat. Status changing to ERROR.`);
                    state.status = 'ERROR';
                }
            }
        }, 5000);
        this.heartbeatTimers.set(name, timerId);
    }
    
    public terminateWorker(name: string): void {
        const worker = this.workers.get(name);
        if (worker) {
            worker.terminate();
            this.workers.delete(name);
        }
        const timerId = this.heartbeatTimers.get(name);
        if (timerId) {
            clearInterval(timerId);
            this.heartbeatTimers.delete(name);
        }
        const state = this.states.get(name);
        if (state) {
            state.status = 'TERMINATED';
        }
    }
}

export const workerManager = new WorkerManager();
