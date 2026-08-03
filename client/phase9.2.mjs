import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, 'src/rebuild');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writeFile = (relPath, content) => {
  const fullPath = path.join(baseDir, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

const files = {
  'models/OptimizationResult.ts': `
export interface OptimizationResult {
    originalLength: number;
    optimizedLength: number;
    compressionRatio: number;
}
  `,
  'models/RebuildResult.ts': `
import { OptimizationResult } from './OptimizationResult';

export interface RebuildResult {
    prompt: string;
    context: string;
    instructions: string[];
    score: number;
    optimization: OptimizationResult;
}
  `,
  'models/RebuildContext.ts': `
import { Intent, RiskLevel } from '../../destructor/models';

export interface RebuildContext {
    originalPrompt: string;
    sanitizedPrompt: string;
    intent: Intent;
    riskLevel: RiskLevel;
}
  `,
  'utils/cleaner.ts': `
export const cleanWhitespace = (text: string): string => text.replace(/\\s+/g, ' ').trim();
  `,
  'utils/normalizer.ts': `
export const normalizeCase = (text: string): string => text.toLowerCase();
  `,
  'utils/formatter.ts': `
export const formatSection = (title: string, content: string): string => \`[\${title.toUpperCase()}]\\n\${content}\\n\`;
  `,
  'builders/promptBuilder.ts': `
export const buildPrompt = (context: string, instructions: string[]): string => {
  return \`\${context}\\n\\nInstructions:\\n\${instructions.join('\\n')}\`;
};
  `,
  'builders/contextBuilder.ts': `
export const buildContext = (base: string): string => {
  return \`Context: \${base}\`;
};
  `,
  'builders/instructionBuilder.ts': `
export const buildInstructions = (rules: string[]): string[] => {
  return rules.map((r, i) => \`\${i + 1}. \${r}\`);
};
  `,
  'builders/templateBuilder.ts': `
export const buildTemplate = (content: string): string => {
  return \`--- TEMPLATE ---\\n\${content}\\n----------------\`;
};
  `,
  'optimizers/tokenOptimizer.ts': `
import { cleanWhitespace } from '../utils/cleaner';
export const optimizeTokens = (text: string): string => cleanWhitespace(text);
  `,
  'optimizers/structureOptimizer.ts': `
export const optimizeStructure = (sections: string[]): string => sections.join('\\n\\n');
  `,
  'optimizers/semanticOptimizer.ts': `
export const optimizeSemantics = (text: string): string => text;
  `,
  'validators/syntaxValidator.ts': `
export const validateSyntax = (text: string): boolean => text.length > 0;
  `,
  'validators/securityValidator.ts': `
export const validateSecurity = (text: string): boolean => !text.includes('UNSAFE');
  `,
  'validators/consistencyValidator.ts': `
export const validateConsistency = (text: string): boolean => text.trim().length === text.length;
  `,
  'engine/rebuildEngine.ts': `
import { RebuildContext } from '../models/RebuildContext';
import { RebuildResult } from '../models/RebuildResult';
import { validateSyntax } from '../validators/syntaxValidator';
import { validateSecurity } from '../validators/securityValidator';
import { validateConsistency } from '../validators/consistencyValidator';
import { optimizeTokens } from '../optimizers/tokenOptimizer';
import { optimizeSemantics } from '../optimizers/semanticOptimizer';
import { buildPrompt } from '../builders/promptBuilder';
import { buildContext } from '../builders/contextBuilder';
import { buildInstructions } from '../builders/instructionBuilder';
import { buildTemplate } from '../builders/templateBuilder';

export class RebuildEngine {
  public process(context: RebuildContext): RebuildResult {
    const originalLength = context.originalPrompt.length;
    
    validateSyntax(context.sanitizedPrompt);
    validateSecurity(context.sanitizedPrompt);
    validateConsistency(context.sanitizedPrompt);

    const optimizedTokens = optimizeTokens(context.sanitizedPrompt);
    const optimizedSemantics = optimizeSemantics(optimizedTokens);
    
    const builtContext = buildContext(optimizedSemantics);
    const builtInstructions = buildInstructions(['Follow security guidelines.', 'Ensure safe output.']);
    const finalPrompt = buildPrompt(builtContext, builtInstructions);
    const templatedPrompt = buildTemplate(finalPrompt);

    const optimizedLength = templatedPrompt.length;
    const compressionRatio = originalLength > 0 ? optimizedLength / originalLength : 1;

    return {
      prompt: templatedPrompt,
      context: builtContext,
      instructions: builtInstructions,
      score: 95,
      optimization: {
        originalLength,
        optimizedLength,
        compressionRatio
      }
    };
  }
}
  `,
  'services/rebuildService.ts': `
import { RebuildEngine } from '../engine/rebuildEngine';
import { RebuildContext } from '../models/RebuildContext';
import { RebuildResult } from '../models/RebuildResult';

class RebuildService {
    private engine = new RebuildEngine();

    public rebuild(context: RebuildContext): RebuildResult {
        return this.engine.process(context);
    }
}

export const rebuildService = new RebuildService();
  `,
  'index.ts': `
export * from './engine/rebuildEngine';
export * from './builders/promptBuilder';
export * from './builders/contextBuilder';
export * from './builders/instructionBuilder';
export * from './builders/templateBuilder';
export * from './optimizers/tokenOptimizer';
export * from './optimizers/structureOptimizer';
export * from './optimizers/semanticOptimizer';
export * from './validators/syntaxValidator';
export * from './validators/securityValidator';
export * from './validators/consistencyValidator';
export * from './services/rebuildService';
export * from './models/RebuildContext';
export * from './models/RebuildResult';
export * from './models/OptimizationResult';
export * from './utils/formatter';
export * from './utils/cleaner';
export * from './utils/normalizer';
  `
};

for (const [name, content] of Object.entries(files)) {
  writeFile(name, content);
}

console.log('Phase 9.2 scaffolding complete');
