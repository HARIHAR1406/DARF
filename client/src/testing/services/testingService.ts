import { TestingEngine } from '../engine/testingEngine';
import { TestResult } from '../models/TestResult';

class TestingService {
    private engine = new TestingEngine();

    public runAll(): TestResult {
        return this.engine.runTests();
    }
}

export const testingService = new TestingService();
