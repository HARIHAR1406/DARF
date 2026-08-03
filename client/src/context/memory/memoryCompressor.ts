import { compressContext } from '../utils/compressor';

export class MemoryCompressor {
    public compress(content: string): string {
        return compressContext(content);
    }
}
