import { RegressionState } from '../models/RegressionState';
import { TestRunState } from '../models/TestRunState';
import { performanceRegressionDetector } from './performanceRegressionDetector';
import { failureRegressionDetector } from './failureRegressionDetector';

export class RegressionDetector {
    public detectAll(runState: TestRunState): RegressionState[] {
        const perfRegressions = performanceRegressionDetector.detect();
        const failRegressions = failureRegressionDetector.detect(runState);
        
        // We bundle failure regressions into a general 'Pipeline' regression entry for simplicity
        if (failRegressions.newlyFailing.length > 0 || failRegressions.previouslyFailing.length > 0) {
            perfRegressions.push({
                operation: 'Pipeline Failures',
                baselineLatencyMs: null,
                currentLatencyMs: 0,
                shiftPercentage: 0,
                level: failRegressions.newlyFailing.length > 0 ? 'CRITICAL' : 'DEGRADED',
                newlyFailingTests: failRegressions.newlyFailing,
                previouslyFailingTests: failRegressions.previouslyFailing
            });
        }
        
        // Update historical failures for next run
        failureRegressionDetector.updateBaseline(runState);

        return perfRegressions;
    }
}

export const regressionDetector = new RegressionDetector();
