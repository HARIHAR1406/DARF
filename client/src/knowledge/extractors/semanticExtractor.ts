export const generateSemanticVector = (content: string): number[] => {
    // Generate a pseudo-random consistent vector based on string hash for local in-memory simulation
    // In production, this would call OpenAI text-embedding-ada-002 or Gemini embeddings
    const vector = new Array(128).fill(0);
    
    for (let i = 0; i < content.length; i++) {
        const charCode = content.charCodeAt(i);
        vector[i % 128] += charCode;
    }
    
    // Normalize vector
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (magnitude === 0) return vector;
    
    return vector.map(val => val / magnitude);
};
