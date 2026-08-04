import { ProviderConfiguration } from '../models/ProviderConfiguration';
export const validateProvider = (config: ProviderConfiguration): boolean => !!config.apiKey;
