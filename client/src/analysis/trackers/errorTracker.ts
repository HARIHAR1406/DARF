import { ErrorRecord } from '../models/ErrorRecord';
export const trackError = (error: ErrorRecord): void => { console.log(error); };
