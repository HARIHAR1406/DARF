import { ChatContext, StreamingChunk } from './ai';

export interface ProviderConfiguration {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  model?: string;
}

export type ProviderStatus = 'idle' | 'generating' | 'error';
export interface ProviderError extends Error {
  code: string;
  retryable: boolean;
}

export interface AIProvider {
  name: string;
  generateText(context: ChatContext, config?: ProviderConfiguration): Promise<string>;
  streamText(context: ChatContext, onChunk: (chunk: StreamingChunk) => void, config?: ProviderConfiguration): Promise<void>;
}
