import { SecurityState } from '../models/SecurityState';
import { ThreatAnalyzer } from '../analyzers/threatAnalyzer';
import { AuthenticationManager } from './authenticationManager';
import { CONTENT_SECURITY_POLICY } from '../policies/contentSecurityPolicy';

class SecurityManager {
    private state: SecurityState;
    
    constructor() {
        this.state = {
            sessionId: 'init',
            level: 'LOW',
            timestamp: Date.now(),
            activeThreats: 0,
            blockedRequests: 0,
            isAuthenticated: false,
            permissions: []
        };
    }
    
    public initialize(): void {
        // Apply CSP to document
        CONTENT_SECURITY_POLICY.applyToDocument();
        this.updateState();
    }
    
    public updateState(): void {
        const activeThreats = ThreatAnalyzer.getActiveThreats();
        
        this.state = {
            ...this.state,
            sessionId: AuthenticationManager.getSessionId(),
            activeThreats: activeThreats.length,
            isAuthenticated: AuthenticationManager.isAuthenticated(),
            timestamp: Date.now()
        };
        
        // Escalate security level based on threats
        if (activeThreats.some(t => t.severity === 'CRITICAL')) {
            this.state.level = 'CRITICAL';
        } else if (activeThreats.some(t => t.severity === 'HIGH')) {
            this.state.level = 'HIGH';
        } else if (activeThreats.length > 0) {
            this.state.level = 'MEDIUM';
        } else {
            this.state.level = 'LOW';
        }
    }
    
    public incrementBlockedRequests(): void {
        this.state.blockedRequests++;
        this.updateState();
    }
    
    public getState(): SecurityState {
        this.updateState();
        return { ...this.state };
    }
    
    public isSystemCompromised(): boolean {
        return this.state.level === 'CRITICAL';
    }
}

export const securityManager = new SecurityManager();
