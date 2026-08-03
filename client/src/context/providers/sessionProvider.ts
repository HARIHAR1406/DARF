import { SessionContext } from '../models/SessionContext';

export class SessionProvider {
    private session: SessionContext | null = null;

    public initSession(id: string): void {
        this.session = {
            sessionId: id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    public getSession(): SessionContext | null {
        return this.session;
    }
}
