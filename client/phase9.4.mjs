import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, 'src/context');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writeFile = (relPath, content) => {
  const fullPath = path.join(baseDir, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

const files = {
  'models/ContextEntry.ts': `
export interface ContextEntry {
    id: string;
    content: string;
    timestamp: string;
}
  `,
  'models/MemoryEntry.ts': `
export interface MemoryEntry {
    id: string;
    content: string;
    score: number;
}
  `,
  'models/SessionContext.ts': `
export interface SessionContext {
    sessionId: string;
    createdAt: string;
    updatedAt: string;
}
  `,
  'models/RetrievalResult.ts': `
import { MemoryEntry } from './MemoryEntry';

export interface RetrievalResult {
    entries: MemoryEntry[];
    totalScore: number;
}
  `,
  'utils/compressor.ts': `
export const compressContext = (data: string): string => data.replace(/\\s+/g, ' ').trim();
  `,
  'utils/tokenizer.ts': `
export const tokenizeContext = (data: string): string[] => data.split(' ').filter(Boolean);
  `,
  'utils/normalizer.ts': `
export const normalizeContext = (data: string): string => data.toLowerCase().trim();
  `,
  'utils/scorer.ts': `
export const calculateContextScore = (content: string): number => Math.min(content.length, 100);
  `,
  'validators/memoryValidator.ts': `
import { MemoryEntry } from '../models/MemoryEntry';

export const validateMemory = (entry: MemoryEntry): boolean => {
    return !!(entry.id && entry.content && typeof entry.score === 'number');
};
  `,
  'validators/contextValidator.ts': `
import { ContextEntry } from '../models/ContextEntry';

export const validateContext = (entry: ContextEntry): boolean => {
    return !!(entry.id && entry.content && entry.timestamp);
};
  `,
  'validators/sessionValidator.ts': `
import { SessionContext } from '../models/SessionContext';

export const validateSession = (session: SessionContext): boolean => {
    return !!(session.sessionId && session.createdAt && session.updatedAt);
};
  `,
  'memory/memoryManager.ts': `
import { MemoryEntry } from '../models/MemoryEntry';

export class MemoryManager {
    private memories: Map<string, MemoryEntry> = new Map();

    public createMemory(entry: MemoryEntry): void {
        this.memories.set(entry.id, entry);
    }

    public updateMemory(id: string, entry: Partial<MemoryEntry>): void {
        const existing = this.memories.get(id);
        if (existing) {
            this.memories.set(id, { ...existing, ...entry });
        }
    }

    public deleteMemory(id: string): void {
        this.memories.delete(id);
    }

    public retrieveMemory(id: string): MemoryEntry | undefined {
        return this.memories.get(id);
    }
}
  `,
  'memory/memoryIndexer.ts': `
import { ContextEntry } from '../models/ContextEntry';

export class MemoryIndexer {
    private index: Map<string, ContextEntry> = new Map();

    public indexEntry(entry: ContextEntry): void {
        this.index.set(entry.id, entry);
    }

    public getIndexedEntry(id: string): ContextEntry | undefined {
        return this.index.get(id);
    }
}
  `,
  'memory/memoryCompressor.ts': `
import { compressContext } from '../utils/compressor';

export class MemoryCompressor {
    public compress(content: string): string {
        return compressContext(content);
    }
}
  `,
  'memory/memoryRetriever.ts': `
import { MemoryEntry } from '../models/MemoryEntry';
import { RetrievalResult } from '../models/RetrievalResult';
import { calculateContextScore } from '../utils/scorer';

export class MemoryRetriever {
    public retrieve(query: string, entries: MemoryEntry[]): RetrievalResult {
        const queryScore = calculateContextScore(query);
        const relevant = entries.filter(e => e.score >= queryScore);
        
        return {
            entries: relevant,
            totalScore: relevant.reduce((acc, val) => acc + val.score, 0)
        };
    }
}
  `,
  'providers/contextProvider.ts': `
import { ContextEntry } from '../models/ContextEntry';

export class ContextProvider {
    private state: ContextEntry[] = [];

    public provideContext(): ContextEntry[] {
        return this.state;
    }

    public updateState(entry: ContextEntry): void {
        this.state.push(entry);
    }
}
  `,
  'providers/sessionProvider.ts': `
import { SessionContext } from '../models/SessionContext';

export class SessionProvider {
    private session: SessionContext | null = null;

    public initSession(id: string): void {
        this.session = {
            sessionId: id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    public getSession(): SessionContext | null {
        return this.session;
    }
}
  `,
  'providers/cacheProvider.ts': `
export class CacheProvider {
    private cache: Map<string, { value: string; expires: number }> = new Map();

    public set(key: string, value: string, ttlMs: number): void {
        this.cache.set(key, { value, expires: Date.now() + ttlMs });
    }

    public get(key: string): string | null {
        const entry = this.cache.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
}
  `,
  'engine/contextEngine.ts': `
import { ContextEntry } from '../models/ContextEntry';
import { RetrievalResult } from '../models/RetrievalResult';
import { validateContext } from '../validators/contextValidator';
import { normalizeContext } from '../utils/normalizer';
import { MemoryCompressor } from '../memory/memoryCompressor';
import { MemoryIndexer } from '../memory/memoryIndexer';
import { MemoryRetriever } from '../memory/memoryRetriever';

export class ContextEngine {
    private compressor = new MemoryCompressor();
    private indexer = new MemoryIndexer();
    private retriever = new MemoryRetriever();

    public process(entry: ContextEntry): RetrievalResult {
        if (!validateContext(entry)) {
            throw new Error('Invalid context entry');
        }

        const normalized = normalizeContext(entry.content);
        const compressed = this.compressor.compress(normalized);

        const processedEntry: ContextEntry = {
            ...entry,
            content: compressed
        };

        this.indexer.indexEntry(processedEntry);

        return this.retriever.retrieve(compressed, [{ id: entry.id, content: compressed, score: 100 }]);
    }
}
  `,
  'services/contextService.ts': `
import { ContextEngine } from '../engine/contextEngine';
import { ContextEntry } from '../models/ContextEntry';
import { RetrievalResult } from '../models/RetrievalResult';

class ContextService {
    private engine = new ContextEngine();

    public initialize(): void {
        // Initialization logic
    }

    public processContext(entry: ContextEntry): RetrievalResult {
        return this.engine.process(entry);
    }
}

export const contextService = new ContextService();
  `,
  'index.ts': `
export * from './engine/contextEngine';
export * from './memory/memoryManager';
export * from './memory/memoryIndexer';
export * from './memory/memoryCompressor';
export * from './memory/memoryRetriever';
export * from './providers/contextProvider';
export * from './providers/sessionProvider';
export * from './providers/cacheProvider';
export * from './models/ContextEntry';
export * from './models/MemoryEntry';
export * from './models/SessionContext';
export * from './models/RetrievalResult';
export * from './validators/memoryValidator';
export * from './validators/contextValidator';
export * from './validators/sessionValidator';
export * from './services/contextService';
export * from './utils/compressor';
export * from './utils/tokenizer';
export * from './utils/normalizer';
export * from './utils/scorer';
  `
};

for (const [name, content] of Object.entries(files)) {
  writeFile(name, content);
}

console.log('Phase 9.4 scaffolding complete');
