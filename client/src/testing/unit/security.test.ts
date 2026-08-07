import { describe, it, expect } from '../utils/testRunner';
import { securityService } from '../../security/services/securityService';

describe('Security Engine Unit Tests', () => {
    it('should expose validation and sanitation methods', () => {
        expect(typeof securityService.validateRequest).toEqual('function');
        expect(typeof securityService.sanitizeResponse).toEqual('function');
    });
});
