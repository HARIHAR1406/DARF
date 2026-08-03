import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, 'src/destructor');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writeFile = (relPath, content) => {
  const fullPath = path.join(baseDir, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

const files = {
  'models/RiskLevel.ts': `
export enum RiskLevel {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}
  `,
  'models/Intent.ts': `
export enum Intent {
    CHAT,
    SEARCH,
    ANALYSIS,
    CODING,
    REBUILD,
    DESTRUCTOR,
    UNKNOWN
}
  `,
  'models/PromptAnalysis.ts': `
import { Intent } from './Intent';
import { RiskLevel } from './RiskLevel';

export interface PromptAnalysis {
  id: string;
  timestamp: number;
  prompt: string;
  tokens: string[];
  intent: Intent;
  category: string;
  complexity: number;
  confidence: number;
  riskLevel: RiskLevel;
  metadata: Record<string, unknown>;
}
  `,
  'utils/tokenizer.ts': `
export const tokenize = (text: string): string[] => {
  return text.trim().toLowerCase().split(/\\s+/).filter(Boolean);
};
  `,
  'utils/sanitizer.ts': `
export const sanitize = (text: string): string => {
  return text.replace(/[^\\w\\s.,?!-]/g, '').trim();
};
  `,
  'utils/scorer.ts': `
export const calculateScore = (base: number, weight: number): number => {
  return Math.min(Math.max(base * weight, 0), 100);
};
  `,
  'analyzers/intentAnalyzer.ts': `
import { Intent } from '../models/Intent';

export const analyzeIntent = (tokens: string[]): Intent => {
  const text = tokens.join(' ');
  if (text.includes('code') || text.includes('function')) return Intent.CODING;
  if (text.includes('search') || text.includes('find')) return Intent.SEARCH;
  if (text.includes('destroy') || text.includes('destructor')) return Intent.DESTRUCTOR;
  if (text.includes('rebuild')) return Intent.REBUILD;
  if (text.includes('analyze')) return Intent.ANALYSIS;
  if (tokens.length > 0) return Intent.CHAT;
  return Intent.UNKNOWN;
};
  `,
  'analyzers/securityAnalyzer.ts': `
import { RiskLevel } from '../models/RiskLevel';

export const analyzeSecurity = (tokens: string[]): RiskLevel => {
  const text = tokens.join(' ');
  if (text.includes('drop table') || text.includes('rm -rf')) return RiskLevel.CRITICAL;
  if (text.includes('password') || text.includes('secret')) return RiskLevel.HIGH;
  if (text.includes('admin')) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
};
  `,
  'analyzers/structureAnalyzer.ts': `
export const analyzeStructure = (tokens: string[]): { complexity: number; category: string } => {
  const complexity = Math.min(tokens.length * 2, 100);
  const category = tokens.length > 20 ? 'LONG_FORM' : 'SHORT_FORM';
  return { complexity, category };
};
  `,
  'analyzers/promptAnalyzer.ts': `
import { analyzeIntent } from './intentAnalyzer';
import { analyzeSecurity } from './securityAnalyzer';
import { analyzeStructure } from './structureAnalyzer';
import { tokenize } from '../utils/tokenizer';
import { sanitize } from '../utils/sanitizer';
import { PromptAnalysis } from '../models/PromptAnalysis';

export const analyzePrompt = (prompt: string): Omit<PromptAnalysis, 'id' | 'timestamp'> => {
  const sanitized = sanitize(prompt);
  const tokens = tokenize(sanitized);
  
  const intent = analyzeIntent(tokens);
  const riskLevel = analyzeSecurity(tokens);
  const { complexity, category } = analyzeStructure(tokens);
  
  return {
    prompt: sanitized,
    tokens,
    intent,
    category,
    complexity,
    confidence: 85, // Mock baseline confidence
    riskLevel,
    metadata: {
      originalLength: prompt.length,
      sanitizedLength: sanitized.length
    }
  };
};
  `,
  'engine/destructorEngine.ts': `
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
  `,
  'services/destructorService.ts': `
import { DestructorEngine } from '../engine/destructorEngine';
import { PromptAnalysis } from '../models/PromptAnalysis';

const engine = new DestructorEngine();

export const DestructorService = {
  analyzePrompt: (prompt: string): PromptAnalysis => {
    return engine.process(prompt);
  }
};
  `,
  'index.ts': `
export * from './engine/destructorEngine';
export * from './models/Intent';
export * from './models/RiskLevel';
export * from './models/PromptAnalysis';
export * from './services/destructorService';
  `
};

for (const [name, content] of Object.entries(files)) {
  writeFile(name, content);
}

console.log('Phase 9.1 scaffolding complete');
