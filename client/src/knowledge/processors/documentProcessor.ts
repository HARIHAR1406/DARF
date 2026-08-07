import { KnowledgeNode } from '../models/KnowledgeNode';
import { extractEntity } from '../extractors/entityExtractor';
import { extractKeywords } from '../extractors/keywordExtractor';
import { generateSemanticVector } from '../extractors/semanticExtractor';
import { indexVector } from '../indexers/vectorIndexer';
import { indexKeywords } from '../indexers/keywordIndexer';
import { extractRelationships } from '../extractors/relationshipExtractor';
import { indexRelationships } from '../indexers/relationshipIndexer';

export const processDocument = (node: KnowledgeNode): void => {
    // 1. Vectorize
    const vector = generateSemanticVector(node.content);
    indexVector(node, vector);
    
    // 2. Extract and index keywords
    const keywords = extractKeywords(node.content);
    indexKeywords(node, keywords);
    
    // 3. Extract entities and index relationships
    const entities = extractEntity(node.content);
    const relationships = extractRelationships(node.content, entities);
    
    indexRelationships(node, relationships.map(r => r.targetId));
};
