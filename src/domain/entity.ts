export abstract class Entity<T> {
    protected _id!: string;
    protected _props!: T;

    protected constructor(id?: string, props?: T) {
        if (id === undefined || props === undefined) {
            this._props = {} as any;
            return;
        }
        this._id = id;
        this._props = props;
    }

    get id(): string {
        return this._id;
    }

    get props(): T {
        return this._props;
    }

    protected setId(payload?: string) {
        if (payload !== undefined) this._id = payload;
    }

    public equals(entity: Entity<T>) {
        if (entity.id === undefined || entity.id === null) return false;
        if (!(entity instanceof this.constructor)) return false;

        return entity.id === this.id;
    }
}
