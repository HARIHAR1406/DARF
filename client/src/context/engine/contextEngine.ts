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
