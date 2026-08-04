import { ProviderRequest } from '../models/ProviderRequest';
export const validateRequest = (req: ProviderRequest): boolean => !!req.payload;
