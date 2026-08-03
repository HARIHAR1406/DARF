import { SessionContext } from '../models/SessionContext';

export const validateSession = (session: SessionContext): boolean => {
    return !!(session.sessionId && session.createdAt && session.updatedAt);
};
