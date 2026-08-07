export class TestValidator {
    private actual: unknown;

    constructor(actual: unknown) {
        this.actual = actual;
    }

    public toEqual(expected: unknown): void {
        if (JSON.stringify(this.actual) !== JSON.stringify(expected)) {
            throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(this.actual)}`);
        }
    }

    public toBe(expected: unknown): void {
        if (this.actual !== expected) {
            throw new Error(`Expected strictly ${expected} but got ${this.actual}`);
        }
    }

    public toBeTruthy(): void {
        if (!this.actual) {
            throw new Error(`Expected truthy but got ${this.actual}`);
        }
    }

    public toBeFalsy(): void {
        if (this.actual) {
            throw new Error(`Expected falsy but got ${this.actual}`);
        }
    }

    public async toThrow(expectedMessage?: string): Promise<void> {
        if (typeof this.actual !== 'function') {
            throw new Error('toThrow must be called on a function');
        }

        let didThrow = false;
        try {
            const result = this.actual();
            if (result instanceof Promise) {
                await result;
            }
        } catch (e: unknown) {
            didThrow = true;
            if (expectedMessage && e instanceof Error && !e.message.includes(expectedMessage)) {
                throw new Error(`Expected error containing "${expectedMessage}" but got "${e.message}"`);
            }
        }

        if (!didThrow) {
            throw new Error('Expected function to throw an error, but it did not');
        }
    }
}
