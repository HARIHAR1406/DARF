import { KnowledgeEngine } from '../engine/knowledgeEngine';
import { KnowledgeNode } from '../models/KnowledgeNode';
import { RetrievalResult } from '../models/RetrievalResult';
import { restoreVectorState } from '../indexers/vectorIndexer';
import { restoreMetadataState } from '../indexers/metadataIndexer';
import { restoreRelationshipState } from '../indexers/relationshipIndexer';
import { restoreKeywordState } from '../indexers/keywordIndexer';

class KnowledgeService {
    private engine = new KnowledgeEngine();
    private initialized = false;

    public async initialize(): Promise<void> {
        if (this.initialized) return;
        
        await Promise.all([
            restoreVectorState(),
            restoreMetadataState(),
            restoreRelationshipState(),
            restoreKeywordState()
        ]);
        
        this.initialized = true;
    }

    public processKnowledge(node: KnowledgeNode): RetrievalResult {
        return this.engine.execute(node);
    }
}

export const knowledgeService = new KnowledgeService();
