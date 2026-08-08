import { TestRunState } from '../models/TestRunState';
import { TestCaseState } from '../models/TestSuiteState';

export class FailureRegressionDetector {
    // Simulated historical state representing the previous run
    private previousFailedTestNames: Set<string> = new Set([
        // Mock previously failing test
        'should run full linear flow safely'
    ]);

    public detect(currentRun: TestRunState): { newlyFailing: string[]; previouslyFailing: string[] } {
        const newlyFailing: string[] = [];
        const previouslyFailing: string[] = [];

        currentRun.suites.forEach(suite => {
            suite.cases.forEach((testCase: TestCaseState) => {
                if (!testCase.passed) {
                    if (this.previousFailedTestNames.has(testCase.name)) {
                        previouslyFailing.push(testCase.name);
                    } else {
                        newlyFailing.push(testCase.name);
                    }
                }
            });
        });

        return { newlyFailing, previouslyFailing };
    }

    public updateBaseline(currentRun: TestRunState): void {
        this.previousFailedTestNames.clear();
        currentRun.suites.forEach(suite => {
            suite.cases.forEach((testCase: TestCaseState) => {
                if (!testCase.passed) {
                    this.previousFailedTestNames.add(testCase.name);
                }
            });
        });
    }
}

export const failureRegressionDetector = new FailureRegressionDetector();
