import { EvaluationResult } from '../models/EvaluationResult';
export const validateEvaluation = (result: EvaluationResult): boolean => result.accuracy >= 0;
