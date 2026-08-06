import { EventState } from '../models/EventState';

type EventCallback = (event: EventState) => void;

class EventBus {
    private listeners: Map<string, EventCallback[]> = new Map();

    public subscribe(eventType: string, callback: EventCallback): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(callback);
    }

    public publish(event: EventState): void {
        const callbacks = this.listeners.get(event.eventType);
        if (callbacks) {
            callbacks.forEach(cb => {
                try {
                    cb(event);
                } catch (error) {
                    console.error(`Error executing callback for event ${event.eventType}`, error);
                }
            });
        }
    }
}

export const eventBus = new EventBus();
