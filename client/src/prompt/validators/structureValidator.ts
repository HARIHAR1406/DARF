import { PromptStructure } from '../models/PromptStructure';

export const validateStructure = (struct: PromptStructure): boolean => {
  return !!(struct.system && struct.user);
};
