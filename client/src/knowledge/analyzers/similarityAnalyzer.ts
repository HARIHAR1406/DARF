import { SemanticVector } from '../models/SemanticVector';

export const calculateCosineSimilarity = (vecA: SemanticVector, vecB: SemanticVector): number => {
    if (vecA.dimensions.length !== vecB.dimensions.length) return 0;
    
    let dotProduct = 0;
    for (let i = 0; i < vecA.dimensions.length; i++) {
        dotProduct += vecA.dimensions[i] * vecB.dimensions[i];
    }
    
    const magA = vecA.magnitude || Math.sqrt(vecA.dimensions.reduce((s, v) => s + v * v, 0));
    const magB = vecB.magnitude || Math.sqrt(vecB.dimensions.reduce((s, v) => s + v * v, 0));
    
    if (magA === 0 || magB === 0) return 0;
    
    return dotProduct / (magA * magB);
};

export const calculateEuclideanDistance = (vecA: SemanticVector, vecB: SemanticVector): number => {
    if (vecA.dimensions.length !== vecB.dimensions.length) return Infinity;
    
    let sum = 0;
    for (let i = 0; i < vecA.dimensions.length; i++) {
        const diff = vecA.dimensions[i] - vecB.dimensions[i];
        sum += diff * diff;
    }
    
    return Math.sqrt(sum);
};
