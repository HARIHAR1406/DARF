export interface SemanticVector {
    id: string;
    dimensions: number[];
    magnitude?: number; // Pre-calculated for fast cosine similarity
}
