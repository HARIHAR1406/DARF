import { EventState } from '../models/EventState';

export const handleEvent = (event: EventState): void => {
    // Basic event handler logic, potentially mapping to external analytics
    if (event.eventType.includes('ERROR')) {
        console.error(`[Event] Error from ${event.source}:`, event.payload);
    } else {
        // console.log(`[Event] ${event.eventType} from ${event.source}`);
    }
};
