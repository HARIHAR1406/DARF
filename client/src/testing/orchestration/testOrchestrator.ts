import { suiteManager } from './suiteManager';
import { TestRunState } from '../models/TestRunState';
import { TestSuiteState, TestCaseState } from '../models/TestSuiteState';

export class TestOrchestrator {
    public async executeAll(): Promise<TestRunState> {
        const suites = suiteManager.getRegisteredSuites();
        
        const runState: TestRunState = {
            id: `run-${Date.now()}`,
            timestamp: Date.now(),
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            skippedTests: 0,
            durationMs: 0,
            suites: []
        };

        const startTime = Date.now();

        for (const suite of suites) {
            const suiteState: TestSuiteState = {
                name: suite.name,
                domain: suite.domain,
                totalTests: suite.tests.length,
                passedTests: 0,
                failedTests: 0,
                skippedTests: 0,
                durationMs: 0,
                cases: []
            };

            const suiteStartTime = Date.now();

            for (const test of suite.tests) {
                runState.totalTests++;
                const caseState: TestCaseState = { name: test.name, passed: false };

                try {
                    for (const hook of suite.beforeEachHooks) await hook();
                    await test.fn();
                    caseState.passed = true;
                    suiteState.passedTests++;
                    runState.passedTests++;
                } catch (error: unknown) {
                    caseState.passed = false;
                    caseState.error = error instanceof Error ? error.message : String(error);
                    suiteState.failedTests++;
                    runState.failedTests++;
                } finally {
                    for (const hook of suite.afterEachHooks) {
                        try { await hook(); } catch (e) { /* Ignore afterEach teardown errors in tracking */ }
                    }
                    suiteState.cases.push(caseState);
                }
            }

            suiteState.durationMs = Date.now() - suiteStartTime;
            runState.suites.push(suiteState);
        }

        runState.durationMs = Date.now() - startTime;
        return runState;
    }
}

export const testOrchestrator = new TestOrchestrator();
