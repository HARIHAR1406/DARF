import { TestSuiteState } from './TestSuiteState';

export interface TestRunState {
    id: string;
    timestamp: number;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    durationMs: number;
    suites: TestSuiteState[];
}
