import { ErrorRecord } from '../models/ErrorRecord';
export const trackError = (error:  ErrorRecord): void => { void(error); /* operationalized */ };
