import { PromptStructure } from '../models/PromptStructure';
import { validateStructure } from '../validators/structureValidator';
import { validateSecurity } from '../validators/securityValidator';
import { validateIntegrity } from '../validators/integrityValidator';
import { cleanPrompt } from '../utils/promptCleaner';
import { buildSystemPrompt } from '../builders/systemPromptBuilder';
import { buildUserPrompt } from '../builders/userPromptBuilder';

export class PromptEngine {
  public generate(input: string): PromptStructure {
    const cleaned = cleanPrompt(input);
    
    const isValidSecurity = validateSecurity(cleaned);
    const isValidIntegrity = validateIntegrity(cleaned);
    
    if (!isValidSecurity || !isValidIntegrity) {
      throw new Error('Invalid prompt structure or security violation');
    }
    
    const system = buildSystemPrompt(['Strict adherence'], ['No external calls']);
    const user = buildUserPrompt('General', cleaned);
    
    const struct: PromptStructure = {
      system,
      developer: 'Developer rules applied',
      user,
      context: 'Context loaded',
      memory: 'Memory retrieved'
    };
    
    if (!validateStructure(struct)) {
      throw new Error('Invalid prompt structure generated');
    }
    
    return struct;
  }
}
