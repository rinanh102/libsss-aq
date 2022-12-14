export type DomainEvent<T> = {
    aggregateId: any;
    type: string;
    meta?: T;
    createdAt: Date;
};
