import { EventState } from '../models/EventState';
export const validateEvent = (event: EventState): boolean => !!event.eventType;
