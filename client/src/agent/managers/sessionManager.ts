class SessionManager {
    private sessions: Map<string, number> = new Map();
    private readonly expirationTime = 3600000; // 1 hour

    public createSession(sessionId: string): void {
        this.sessions.set(sessionId, Date.now());
    }

    public updateSession(sessionId: string): void {
        if (this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, Date.now());
        }
    }

    public isValid(sessionId: string): boolean {
        const lastActive = this.sessions.get(sessionId);
        if (!lastActive) return false;
        
        const valid = (Date.now() - lastActive) < this.expirationTime;
        if (!valid) {
            this.sessions.delete(sessionId);
        }
        return valid;
    }
    
    public recoverSession(sessionId: string): boolean {
        if (this.isValid(sessionId)) return true;
        this.createSession(sessionId);
        return true;
    }
}

export const sessionManager = new SessionManager();
