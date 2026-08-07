import { TestValidator } from '../validators/testValidator';

export type TestHook = () => void | Promise<void>;
export type TestCallback = () => void | Promise<void>;

interface TestCase {
    name: string;
    fn: TestCallback;
}

interface TestSuite {
    name: string;
    tests: TestCase[];
    beforeEachHooks: TestHook[];
    afterEachHooks: TestHook[];
}

export class TestRunner {
    private suites: TestSuite[] = [];
    private currentSuite: TestSuite | null = null;
    
    public describe(name: string, fn: () => void): void {
        const suite: TestSuite = { name, tests: [], beforeEachHooks: [], afterEachHooks: [] };
        this.suites.push(suite);
        const previousSuite = this.currentSuite;
        this.currentSuite = suite;
        fn();
        this.currentSuite = previousSuite;
    }
    
    public it(name: string, fn: TestCallback): void {
        if (!this.currentSuite) throw new Error('it() must be called inside describe()');
        this.currentSuite.tests.push({ name, fn });
    }
    
    public beforeEach(fn: TestHook): void {
        if (!this.currentSuite) throw new Error('beforeEach() must be called inside describe()');
        this.currentSuite.beforeEachHooks.push(fn);
    }
    
    public afterEach(fn: TestHook): void {
        if (!this.currentSuite) throw new Error('afterEach() must be called inside describe()');
        this.currentSuite.afterEachHooks.push(fn);
    }
    
    public expect(actual: unknown): TestValidator {
        return new TestValidator(actual);
    }
    
    public getSuites(): TestSuite[] {
        return this.suites;
    }
    
    public clear(): void {
        this.suites = [];
        this.currentSuite = null;
    }
}

// Global instance for tests to use
export const runner = new TestRunner();

// Export bindings for test files to simulate Jest-like environment
export const describe = (name: string, fn: () => void) => runner.describe(name, fn);
export const it = (name: string, fn: TestCallback) => runner.it(name, fn);
export const beforeEach = (fn: TestHook) => runner.beforeEach(fn);
export const afterEach = (fn: TestHook) => runner.afterEach(fn);
export const expect = (actual: unknown) => runner.expect(actual);
