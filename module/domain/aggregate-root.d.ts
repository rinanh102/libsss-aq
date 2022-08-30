import { Entity } from './entity';
import { DomainEvent } from './event';
export interface DomainEventHandler {
    publish(event: DomainEvent<any>): void;
}
export declare abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents;
    protected constructor(id?: string, props?: T);
    get domainEvents(): DomainEvent<T>[];
    protected addDomainEvent(domainEvent: DomainEvent<T>): void;
    protected clearEvents(): void;
    dispatchDomainEvents(eventHandler: DomainEventHandler): void;
}
