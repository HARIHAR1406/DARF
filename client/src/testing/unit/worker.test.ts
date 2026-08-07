import { describe, it, expect } from '../utils/testRunner';
import { workerService } from '../../workers/services/workerService';

describe('Worker Engine Unit Tests', () => {
    it('should expose initialize method', () => {
        expect(typeof workerService.initialize).toEqual('function');
    });
});
