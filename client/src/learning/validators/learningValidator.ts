import { LearningState } from '../models/LearningState';
export const validateLearning = (state: LearningState): boolean => !!state.id;
