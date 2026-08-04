import { KnowledgeEngine } from '../engine/knowledgeEngine';
import { KnowledgeNode } from '../models/KnowledgeNode';
import { RetrievalResult } from '../models/RetrievalResult';

class KnowledgeService {
    private engine = new KnowledgeEngine();

    public processKnowledge(node: KnowledgeNode): RetrievalResult {
        return this.engine.execute(node);
    }
}

export const knowledgeService = new KnowledgeService();
