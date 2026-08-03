import { GeminiProvider } from './geminiProvider';
import { OpenAIProvider } from './openaiProvider';
import { AIProvider } from '../types/provider';

export const providers: Record<string, AIProvider> = {
  gemini: new GeminiProvider(),
  openai: new OpenAIProvider()
};
