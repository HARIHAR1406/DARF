import { LearningState } from '../models/LearningState';

export const validateLearning = (state: Partial<LearningState>): boolean => {
    if (!state) return false;
    if (typeof state !== 'object' || Object.keys(state).length === 0) return false;
    
    if (!state.id || typeof state.id !== 'string' || state.id.trim() === '') return false;
    if (typeof state.isActive !== 'boolean') return false;
    if (typeof state.timestamp !== 'number' || isNaN(state.timestamp) || !isFinite(state.timestamp)) return false;
    
    if (!state.context || typeof state.context !== 'object') return false;
    
    return true;
};
