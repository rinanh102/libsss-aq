import { Entity } from './entity';
import { DomainEvent } from './event';

export interface DomainEventHandler {
    publish(event: DomainEvent<any>): void;
}

export abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: DomainEvent<T>[] = [];

    protected constructor(id?: string, props?: T) {
        super(id, props);
    }

    get domainEvents(): DomainEvent<T>[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent<T>): void {
        this._domainEvents.push(domainEvent);
        console.info(`[Domain Event Created]:`, domainEvent);
    }

    protected clearEvents(): void {
        this._domainEvents = [];
    }

    public dispatchDomainEvents(eventHandler: DomainEventHandler) {
        try {
            this._domainEvents.forEach((event) => {
                eventHandler.publish(event);
            });
            console.info(`[Domain Event Published]:`, this.domainEvents);
            this.clearEvents();
        } catch (err) {
            console.error(`[Domain Event Publish Failed]:`, err);
            throw new Error(`Domain Event Publish Failed!`);
        }
    }
}
