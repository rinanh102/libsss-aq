import { Optional } from '@heronjs/common';
import { EavEntityChangeAttributesValuesOutput } from '../eav';

export interface IRepo<T> {
    create: (entity: T) => Promise<T>;
    update: (id: string, entity: T, attributes?: EavEntityChangeAttributesValuesOutput) => Promise<T>;
    delete: (id: string) => Promise<string>;
    findAll: () => Promise<T[]>;
    getById: (id: string) => Promise<Optional<T>>;
}
