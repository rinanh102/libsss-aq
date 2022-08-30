export abstract class ValueObject<T> {
    protected _props: T;

    protected constructor(props: T) {
        this._props = props;
    }

    get props(): T {
        return this._props;
    }

    public abstract equals(valueObject: ValueObject<T>): boolean;
}
