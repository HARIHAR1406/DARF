import { telemetryService } from '../../telemetry/services/telemetryService';
import { syncManager } from '../../execution/managers/syncManager';

export class TelemetryServiceTest {
    public static async runTests(): Promise<void> {
        console.log('Running TelemetryService Failure Isolation Tests...');
        const originalQueueWrite = syncManager.queueWrite;
        
        try {
            this.testFailureIsolation();
            this.testPerformanceTracking();
            console.log('TelemetryService tests passed.');
        } finally {
            syncManager.queueWrite = originalQueueWrite;
        }
    }

    private static testFailureIsolation() {
        syncManager.queueWrite = () => {
            throw new Error('IDB Write Failed');
        };

        try {
            telemetryService.trackEvent('RUNTIME', 'Test', 'testOp', 'SUCCESS', 'INFO');
        } catch (e) {
            throw new Error('Failure isolation failed: telemetryService.trackEvent threw an exception.');
        }
    }

    private static testPerformanceTracking() {
        let capturedEvent: unknown;
        syncManager.queueWrite = (_store: string, _key: string, data: unknown) => {
            capturedEvent = data;
        };

        telemetryService.trackPerformance('TestTracker', 'perfOp', 150);

        if (!capturedEvent) {
            throw new Error('Performance event was not queued for write.');
        }

        const event = capturedEvent as { category: string; durationMs: number; operation: string; };
        if (event.category !== 'PERFORMANCE') throw new Error(`Expected PERFORMANCE category, got ${event.category}`);
        if (event.durationMs !== 150) throw new Error(`Expected 150ms duration, got ${event.durationMs}`);
        if (event.operation !== 'perfOp') throw new Error(`Expected perfOp operation, got ${event.operation}`);
    }
}
