import { TestRunState } from '../models/TestRunState';

export interface AggregatedResult {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    durationMs: number;
    successRate: number;
    failedSuiteNames: string[];
}

export class ResultAggregator {
    public aggregate(runState: TestRunState): AggregatedResult {
        const successRate = runState.totalTests > 0 
            ? (runState.passedTests / runState.totalTests) * 100 
            : 0;

        const failedSuiteNames = runState.suites
            .filter(s => s.failedTests > 0)
            .map(s => s.name);

        return {
            totalTests: runState.totalTests,
            passedTests: runState.passedTests,
            failedTests: runState.failedTests,
            skippedTests: runState.skippedTests,
            durationMs: runState.durationMs,
            successRate,
            failedSuiteNames
        };
    }
}

export const resultAggregator = new ResultAggregator();
