import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, 'src/prompt');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writeFile = (relPath, content) => {
  const fullPath = path.join(baseDir, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

const files = {
  'models/PromptMetadata.ts': `
export interface PromptMetadata {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: string;
}
  `,
  'models/PromptSection.ts': `
export interface PromptSection {
    title: string;
    content: string;
    priority: number;
}
  `,
  'models/PromptStructure.ts': `
export interface PromptStructure {
    system: string;
    developer: string;
    user: string;
    context: string;
    memory: string;
}
  `,
  'builders/systemPromptBuilder.ts': `
export const buildSystemPrompt = (rules: string[], constraints: string[]): string => {
  return \`System Rules:\\n\${rules.join('\\n')}\\nConstraints:\\n\${constraints.join('\\n')}\`;
};
  `,
  'builders/developerPromptBuilder.ts': `
export const buildDeveloperPrompt = (instructions: string[], rules: string[]): string => {
  return \`Developer Instructions:\\n\${instructions.join('\\n')}\\nRules:\\n\${rules.join('\\n')}\`;
};
  `,
  'builders/userPromptBuilder.ts': `
export const buildUserPrompt = (intent: string, input: string): string => {
  return \`Intent: \${intent}\\nInput: \${input}\`;
};
  `,
  'builders/memoryPromptBuilder.ts': `
export const buildMemoryPrompt = (history: string[]): string => {
  return \`Memory Context:\\n\${history.join('\\n')}\`;
};
  `,
  'builders/contextPromptBuilder.ts': `
export const buildContextPrompt = (context: string[]): string => {
  return \`Context Information:\\n\${[...new Set(context)].join('\\n')}\`;
};
  `,
  'builders/securityPromptBuilder.ts': `
export const buildSecurityPrompt = (policies: string[]): string => {
  return \`Security Policies:\\n\${policies.join('\\n')}\`;
};
  `,
  'templates/baseTemplate.ts': `
export const baseTemplate = (content: string): string => \`[BASE]\\n\${content}\\n[/BASE]\`;
  `,
  'templates/analysisTemplate.ts': `
export const analysisTemplate = (content: string): string => \`[ANALYSIS]\\n\${content}\\n[/ANALYSIS]\`;
  `,
  'templates/reconstructionTemplate.ts': `
export const reconstructionTemplate = (content: string): string => \`[RECONSTRUCTION]\\n\${content}\\n[/RECONSTRUCTION]\`;
  `,
  'templates/optimizationTemplate.ts': `
export const optimizationTemplate = (content: string): string => \`[OPTIMIZATION]\\n\${content}\\n[/OPTIMIZATION]\`;
  `,
  'parsers/promptParser.ts': `
export const parsePrompt = (raw: string): string[] => raw.split('\\n').filter(Boolean);
  `,
  'parsers/metadataParser.ts': `
import { PromptMetadata } from '../models/PromptMetadata';

export const parseMetadata = (raw: Record<string, unknown>): PromptMetadata => ({
  id: String(raw.id || crypto.randomUUID()),
  createdAt: String(raw.createdAt || new Date().toISOString()),
  updatedAt: String(raw.updatedAt || new Date().toISOString()),
  version: String(raw.version || '1.0.0')
});
  `,
  'parsers/instructionParser.ts': `
export const parseInstructions = (raw: string): string[] => raw.split(';').map(i => i.trim()).filter(Boolean);
  `,
  'validators/structureValidator.ts': `
import { PromptStructure } from '../models/PromptStructure';

export const validateStructure = (struct: PromptStructure): boolean => {
  return !!(struct.system && struct.user);
};
  `,
  'validators/securityValidator.ts': `
export const validateSecurity = (content: string): boolean => {
  return !content.includes('DROP TABLE') && !content.includes('RM -RF');
};
  `,
  'validators/integrityValidator.ts': `
export const validateIntegrity = (content: string): boolean => {
  return content.trim().length === content.length;
};
  `,
  'utils/promptFormatter.ts': `
export const formatPrompt = (sections: string[]): string => sections.join('\\n---\\n');
  `,
  'utils/promptNormalizer.ts': `
export const normalizePrompt = (content: string): string => content.toLowerCase().trim();
  `,
  'utils/promptCleaner.ts': `
export const cleanPrompt = (content: string): string => content.replace(/\\s+/g, ' ').trim();
  `,
  'engine/promptEngine.ts': `
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
  `,
  'services/promptArchitectureService.ts': `
import { PromptEngine } from '../engine/promptEngine';
import { PromptStructure } from '../models/PromptStructure';

class PromptArchitectureService {
    private engine = new PromptEngine();

    public buildPrompt(input: string): PromptStructure {
        return this.engine.generate(input);
    }
}

export const promptArchitectureService = new PromptArchitectureService();
  `,
  'index.ts': `
export * from './engine/promptEngine';
export * from './builders/systemPromptBuilder';
export * from './builders/developerPromptBuilder';
export * from './builders/userPromptBuilder';
export * from './builders/memoryPromptBuilder';
export * from './builders/contextPromptBuilder';
export * from './builders/securityPromptBuilder';
export * from './templates/baseTemplate';
export * from './templates/analysisTemplate';
export * from './templates/reconstructionTemplate';
export * from './templates/optimizationTemplate';
export * from './parsers/promptParser';
export * from './parsers/metadataParser';
export * from './parsers/instructionParser';
export * from './services/promptArchitectureService';
export * from './models/PromptMetadata';
export * from './models/PromptStructure';
export * from './models/PromptSection';
export * from './validators/structureValidator';
export * from './validators/securityValidator';
export * from './validators/integrityValidator';
export * from './utils/promptFormatter';
export * from './utils/promptNormalizer';
export * from './utils/promptCleaner';
  `
};

for (const [name, content] of Object.entries(files)) {
  writeFile(name, content);
}

console.log('Phase 9.3 scaffolding complete');
