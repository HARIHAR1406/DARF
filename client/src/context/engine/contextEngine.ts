import { ContextEntry } from '../models/ContextEntry';
import { RetrievalResult } from '../models/RetrievalResult';
import { validateContext } from '../validators/contextValidator';
import { normalizeContext } from '../utils/normalizer';
import { MemoryCompressor } from '../memory/memoryCompressor';
import { MemoryIndexer } from '../memory/memoryIndexer';
import { MemoryRetriever } from '../memory/memoryRetriever';
import { optimizationManager } from '../../optimization/managers/optimizationManager';
import { MemoryEntry } from '../models/MemoryEntry';

export class ContextEngine {
    private compressor = new MemoryCompressor();
    private indexer = new MemoryIndexer();
    private retriever = new MemoryRetriever();

    public process(entry: ContextEntry): RetrievalResult {
        if (!validateContext(entry)) {
            throw new Error('Invalid context entry');
        }

        const normalized = normalizeContext(entry.content);
        
        const memoryEntries: MemoryEntry[] = [{ id: entry.id, content: normalized, score: 100, timestamp: Date.now() }];
        
        let compressedEntries = this.compressor.compress(memoryEntries);
        // Optimize using new layer
        compressedEntries = optimizationManager.context.compressContexts(compressedEntries);
        
        const compressedContent = compressedEntries[0]?.content || normalized;

        const processedEntry: ContextEntry = {
            ...entry,
            content: compressedContent
        };

        this.indexer.indexEntry(processedEntry);

        return this.retriever.retrieve(compressedContent, compressedEntries);
    }
}
