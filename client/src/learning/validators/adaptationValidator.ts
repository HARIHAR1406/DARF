import { AdaptationState } from '../models/AdaptationState';

export const validateAdaptation = (state: Partial<AdaptationState>): boolean => {
    if (!state) return false;
    if (typeof state !== 'object' || Object.keys(state).length === 0) return false;
    
    if (!state.id || typeof state.id !== 'string' || state.id.trim() === '') return false;
    
    if (typeof state.originalScore !== 'number' || isNaN(state.originalScore) || !isFinite(state.originalScore)) return false;
    if (typeof state.adaptedScore !== 'number' || isNaN(state.adaptedScore) || !isFinite(state.adaptedScore)) return false;
    if (typeof state.timestamp !== 'number' || isNaN(state.timestamp) || !isFinite(state.timestamp)) return false;
    
    if (!Array.isArray(state.appliedStrategies)) return false;
    
    return true;
};
