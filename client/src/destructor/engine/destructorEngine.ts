import { PromptAnalysis } from '../models/PromptAnalysis';
import { analyzePrompt } from '../analyzers/promptAnalyzer';

export class DestructorEngine {
  public process(prompt: string): PromptAnalysis {
    const analysis = analyzePrompt(prompt);
    
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...analysis
    };
  }
}
