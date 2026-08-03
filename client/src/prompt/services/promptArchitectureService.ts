import { PromptEngine } from '../engine/promptEngine';
import { PromptStructure } from '../models/PromptStructure';

class PromptArchitectureService {
    private engine = new PromptEngine();

    public buildPrompt(input: string): PromptStructure {
        return this.engine.generate(input);
    }
}

export const promptArchitectureService = new PromptArchitectureService();
