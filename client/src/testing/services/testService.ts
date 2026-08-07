import { runner } from '../utils/testRunner';

export interface TestReport {
    total: number;
    passed: number;
    failed: number;
    durationMs: number;
    failures: Array<{ suite: string; test: string; error: string }>;
}

export class TestService {
    public async runAllTests(): Promise<TestReport> {
        const suites = runner.getSuites();
        const report: TestReport = {
            total: 0,
            passed: 0,
            failed: 0,
            durationMs: 0,
            failures: []
        };
        
        const startTime = Date.now();
        
        for (const suite of suites) {
            console.log(`Running suite: ${suite.name}`);
            
            for (const test of suite.tests) {
                report.total++;
                try {
                    // Run beforeEach
                    for (const hook of suite.beforeEachHooks) {
                        await hook();
                    }
                    
                    // Run test
                    await test.fn();
                    report.passed++;
                    console.log(`  ✓ ${test.name}`);
                } catch (error: unknown) {
                    report.failed++;
                    const msg = error instanceof Error ? error.message : String(error);
                    console.error(`  ✗ ${test.name} - ${msg}`);
                    report.failures.push({ suite: suite.name, test: test.name, error: msg });
                } finally {
                    // Run afterEach
                    for (const hook of suite.afterEachHooks) {
                        try {
                            await hook();
                        } catch (e) {
                            console.error(`Error in afterEach for ${suite.name}:`, e);
                        }
                    }
                }
            }
        }
        
        report.durationMs = Date.now() - startTime;
        return report;
    }
}

export const testService = new TestService();
