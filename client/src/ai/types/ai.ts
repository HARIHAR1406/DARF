export type Role = 'user' | 'model' | 'system';
export interface AIMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}
export interface AIResponse {
  content: string;
  tokensUsed?: number;
  error?: string;
}
export interface ChatContext {
  messages: AIMessage[];
  systemInstruction?: string;
}
export interface StreamingChunk {
  text: string;
  isFinished: boolean;
}
