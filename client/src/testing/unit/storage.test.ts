import { describe, it, expect } from '../utils/testRunner';
import { storageService } from '../../storage/services/storageService';

describe('Storage Engine Unit Tests', () => {
    it('should expose initialize method', () => {
        expect(typeof storageService.initialize).toEqual('function');
    });
});
