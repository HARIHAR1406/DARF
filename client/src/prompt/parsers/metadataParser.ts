import { PromptMetadata } from '../models/PromptMetadata';

export const parseMetadata = (raw: Record<string, unknown>): PromptMetadata => ({
  id: String(raw.id || crypto.randomUUID()),
  createdAt: String(raw.createdAt || new Date().toISOString()),
  updatedAt: String(raw.updatedAt || new Date().toISOString()),
  version: String(raw.version || '1.0.0')
});
