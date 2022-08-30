export declare abstract class Entity<T> {
    protected _id: string;
    protected _props: T;
    protected constructor(id?: string, props?: T);
    get id(): string;
    get props(): T;
    protected setId(payload?: string): void;
    equals(entity: Entity<T>): boolean;
}
