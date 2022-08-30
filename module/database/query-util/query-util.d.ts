import { ModuleDatabase, Optional } from '@heronjs/common';
import { KnexClient } from '@heronjs/core';
import { Knex } from 'knex';
import { AllTables, QueryUtilJoinOptions, QueryUtilMethodOptions, QueryInput } from '.';
import { BaseTable, RelationTable } from '../table';
export interface IQueryUtil<T = any> {
    transaction(exec: (trx: Knex.Transaction) => Promise<any>): Promise<void>;
    create(tableName: string, dto: T, options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    createList(tableName: string, dtos: T[], options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    updateById(tableName: string, id: string, dto: Partial<T>, options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    updateList(tableName: string, dtos: (Partial<T> & {
        id: string;
    })[], options?: QueryUtilMethodOptions): Promise<void>;
    deleteById(tableName: string, id: string, options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    deleteList(tableName: string, ids: string[], options?: QueryUtilMethodOptions): Promise<void>;
    find(tableName: string, payload?: QueryInput<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T> & {
        tb?: BaseTable;
        relations?: RelationTable[];
    }): Knex.QueryBuilder;
    transform(tableName: string, records: Optional<any[]>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T> & {
        tb?: BaseTable;
        relations?: RelationTable[];
    }): Partial<T>[];
    findAndTransform(tableName: string, payload?: QueryInput<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>): Promise<Partial<T>[]>;
}
export declare class BaseQueryUtil<T = any> implements IQueryUtil<T> {
    protected readonly _client: KnexClient;
    protected readonly _allTables: AllTables;
    private readonly _tableConstrainNameMap;
    constructor(payload: {
        db: ModuleDatabase<KnexClient>;
        tables: AllTables;
    });
    transaction(exec: (trx: Knex.Transaction) => Promise<any>): Promise<void>;
    create(tableName: string, dto: T, options?: QueryUtilMethodOptions): Knex.QueryBuilder<any, number[]>;
    createList(tableName: string, dtos: T[], options?: QueryUtilMethodOptions): Knex.QueryBuilder<any, number[]>;
    updateById(tableName: string, id: string, dto: Partial<T>, options?: QueryUtilMethodOptions): Knex.QueryBuilder<any, number>;
    updateList(tableName: string, dtos: (Partial<T> & {
        id: string;
    })[], options?: QueryUtilMethodOptions): Promise<void>;
    deleteById(tableName: string, id: string, options?: QueryUtilMethodOptions): Knex.QueryBuilder<any, number>;
    deleteList(tableName: string, ids: string[], options?: QueryUtilMethodOptions): Promise<void>;
    find(tableName: string, payload?: QueryInput<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T> & {
        tb?: BaseTable;
        relations?: RelationTable[];
    }): Knex.QueryBuilder<{}, ({
        _base: {};
        _hasSelection: boolean;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    } | {
        _base: {};
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    })[] | {
        _base: {};
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    transform(tableName: string, records: Optional<any[]>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T> & {
        tb?: BaseTable;
        relations?: RelationTable[];
    }): Partial<any>[];
    findAndTransform(tableName: string, payload?: QueryInput<T>, options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>): Promise<Partial<any>[]>;
    private _getTable;
    private _getRelations;
    private _buildWhereQuery;
    private _transformWhereQuery;
    private _transformEavWhereQuery;
    private _buildSortQuery;
    private _buildJoinQuery;
    private _transformJoinResult;
    private _resolveRelations;
    private _getConstraintName;
}
