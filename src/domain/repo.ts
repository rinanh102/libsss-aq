import { Optional } from '@heronjs/common';

export interface IRepo<T> {
    create: (input: any) => Promise<T>;
    update: (id: string, input: any) => Promise<T>;
    delete: (id: string) => Promise<T>;
    findAll: () => Promise<T[]>;
    getById: (id: string) => Promise<Optional<T>>;
}
