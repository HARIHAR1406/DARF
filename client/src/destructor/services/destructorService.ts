import { DestructorEngine } from '../engine/destructorEngine';
import { PromptAnalysis } from '../models/PromptAnalysis';

const engine = new DestructorEngine();

export const DestructorService = {
  analyzePrompt: (prompt: string): PromptAnalysis => {
    return engine.process(prompt);
  }
};
