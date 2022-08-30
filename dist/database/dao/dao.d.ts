import { ModuleDatabase, Optional } from '@heronjs/common';
import { KnexClient } from '@heronjs/core';
import { Knex } from 'knex';
import { IQueryUtil, QueryInput, QueryInputFindOne, QueryUtilJoinOptions, QueryUtilMethodOptions } from '../query-util';
export interface IBaseDao<T> {
    transaction(exec: (trx: Knex.Transaction) => Promise<any>): Promise<void>;
    create(dto: T, options?: QueryUtilMethodOptions): Promise<T>;
    createList(dtos: T[], options?: QueryUtilMethodOptions): Promise<T[]>;
    updateById(id: string, dto: Partial<T>, options?: QueryUtilMethodOptions): Promise<Partial<T>>;
    updateList(dtos: (Partial<T> & {
        id: string;
    })[], options?: QueryUtilMethodOptions): Promise<Partial<T>[]>;
    deleteById(id: string, options?: QueryUtilMethodOptions): Promise<string>;
    deleteList(ids: string[], options?: QueryUtilMethodOptions): Promise<string[]>;
    find(payload?: QueryInput<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>): Promise<Partial<T>[]>;
    findOne(payload?: QueryInputFindOne<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>): Promise<Optional<Partial<T>>>;
}
export declare class BaseDao<T> implements IBaseDao<T> {
    protected readonly _tableName: string;
    protected readonly _client: KnexClient;
    protected readonly _queryUtil: IQueryUtil<T>;
    constructor(payload: {
        tableName: string;
        db: ModuleDatabase<KnexClient>;
        queryUtil: IQueryUtil<T>;
    });
    transaction(exec: (trx: Knex.Transaction) => Promise<any>): Promise<void>;
    create(dto: T, options?: QueryUtilMethodOptions): Promise<T>;
    createList(dtos: T[], options?: QueryUtilMethodOptions): Promise<T[]>;
    updateById(id: string, dto: Partial<T>, options?: QueryUtilMethodOptions): Promise<Partial<T>>;
    updateList(dtos: (Partial<T> & {
        id: string;
    })[], options?: QueryUtilMethodOptions): Promise<(Partial<T> & {
        id: string;
    })[]>;
    deleteById(id: string, options?: QueryUtilMethodOptions): Promise<string>;
    deleteList(ids: string[], options?: QueryUtilMethodOptions): Promise<string[]>;
    find(payload?: QueryInput<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>): Promise<Partial<T>[]>;
    findOne(payload?: QueryInputFindOne<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>): Promise<Partial<T> | undefined>;
    protected _transformError(err: any): any;
}
