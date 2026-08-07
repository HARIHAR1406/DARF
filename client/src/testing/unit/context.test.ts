import { describe, it, expect } from '../utils/testRunner';
import { contextService } from '../../context/services/contextService';

describe('Context Engine Unit Tests', () => {
    it('should initialize successfully', async () => {
        let success = false;
        try {
            await contextService.initialize();
            success = true;
        } catch (e) {
            console.error(e);
        }
        expect(success).toBeTruthy();
    });
});
