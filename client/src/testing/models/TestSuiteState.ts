export interface TestCaseState {
    name: string;
    passed: boolean;
    error?: string;
}

export interface TestSuiteState {
    name: string;
    domain: string;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    durationMs: number;
    cases: TestCaseState[];
}
