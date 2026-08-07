import { describe, it, expect } from '../utils/testRunner';
import { AuthenticationManager } from '../../security/managers/authenticationManager';

describe('Auth Flow E2E', () => {
    it('should successfully simulate a login and logout', () => {
        // Initial state
        expect(AuthenticationManager.isAuthenticated()).toBeFalsy();
        
        // Simulate login
        AuthenticationManager.login('test-token', 1000 * 60 * 60); // 1 hour session
        expect(AuthenticationManager.isAuthenticated()).toBeTruthy();
        expect(AuthenticationManager.getSessionId()).toEqual('test-token');
        
        // Simulate logout
        AuthenticationManager.logout();
        expect(AuthenticationManager.isAuthenticated()).toBeFalsy();
    });
});
