import { CommunicationState } from '../models/CommunicationState';
export const validateCommunication = (state: CommunicationState): boolean => !!state.channel;
