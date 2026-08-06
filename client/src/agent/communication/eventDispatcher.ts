import { eventBus } from './eventBus';
import { EventState } from '../models/EventState';

export const dispatchEvent = (eventType: string, payload: Record<string, unknown> | string, source: string): void => {
    const event: EventState = {
        eventId: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        eventType,
        payload,
        source,
        timestamp: Date.now()
    };
    
    eventBus.publish(event);
};
