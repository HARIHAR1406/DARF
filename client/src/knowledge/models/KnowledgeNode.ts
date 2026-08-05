export interface KnowledgeNode {
    id: string;
    type: string;
    content: string;
    metadata?: Record<string, string | number | boolean>;
    vector?: number[];
}
