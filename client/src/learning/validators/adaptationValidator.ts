import { AdaptationState } from '../models/AdaptationState';
export const validateAdaptation = (state: AdaptationState): boolean => !!state.status;
