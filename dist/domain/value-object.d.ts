export declare abstract class ValueObject<T> {
    protected _props: T;
    protected constructor(props: T);
    get props(): T;
    abstract equals(valueObject: ValueObject<T>): boolean;
}
