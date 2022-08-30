import { Logger, ModuleDatabase, Optional, SQLError, SQLErrors } from '@heronjs/common';
import { KnexClient } from '@heronjs/core';
import { injectable } from 'inversify';
import { Knex } from 'knex';
import {
    IQueryUtil,
    QueryInput,
    QueryInputFindOne,
    QueryUtilJoinOptions,
    QueryUtilMethodOptions,
} from '../query-util';

export interface IBaseDao<T> {
    transaction(exec: (trx: Knex.Transaction) => Promise<any>): Promise<void>;
    create(dto: T, options?: QueryUtilMethodOptions): Promise<T>;
    createList(dtos: T[], options?: QueryUtilMethodOptions): Promise<T[]>;
    updateById(id: string, dto: Partial<T>, options?: QueryUtilMethodOptions): Promise<Partial<T>>;
    updateList(
        dtos: (Partial<T> & { id: string })[],
        options?: QueryUtilMethodOptions,
    ): Promise<Partial<T>[]>;
    deleteById(id: string, options?: QueryUtilMethodOptions): Promise<string>;
    deleteList(ids: string[], options?: QueryUtilMethodOptions): Promise<string[]>;
    find(
        payload?: QueryInput<T>,
        options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>,
    ): Promise<Partial<T>[]>;
    findOne(
        payload?: QueryInputFindOne<T>,
        options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>,
    ): Promise<Optional<Partial<T>>>;
}

@injectable()
export class BaseDao<T> implements IBaseDao<T> {
    protected readonly _tableName: string;
    protected readonly _client: KnexClient;
    protected readonly _queryUtil: IQueryUtil<T>;

    constructor(payload: { tableName: string; db: ModuleDatabase<KnexClient>; queryUtil: IQueryUtil<T> }) {
        const { tableName, db, queryUtil } = payload;

        const client = db.database();
        if (!client) throw new SQLError(SQLErrors.CONNECTION_ERR, 'Database client is undefined');

        this._tableName = tableName;
        this._client = client;
        this._queryUtil = queryUtil;
    }

    public async transaction(exec: (trx: Knex.Transaction) => Promise<any>) {
        return this._queryUtil.transaction((trx) => exec(trx));
    }

    public async create(dto: T, options: QueryUtilMethodOptions = {}) {
        try {
            await this._queryUtil.create(this._tableName, dto, options);
            return dto;
        } catch (err: any) {
            throw this._transformError(err);
        }
    }

    public async createList(dtos: T[], options: QueryUtilMethodOptions = {}) {
        try {
            if (dtos.length) await this._queryUtil.createList(this._tableName, dtos, options);
            return dtos;
        } catch (err: any) {
            throw this._transformError(err);
        }
    }

    public async updateById(id: string, dto: Partial<T>, options: QueryUtilMethodOptions = {}) {
        try {
            await this._queryUtil.updateById(this._tableName, id, dto, options);
            return dto;
        } catch (err) {
            throw this._transformError(err);
        }
    }

    public async updateList(dtos: (Partial<T> & { id: string })[], options: QueryUtilMethodOptions = {}) {
        try {
            if (dtos.length) await this._queryUtil.updateList(this._tableName, dtos, options);
            return dtos;
        } catch (err: any) {
            throw this._transformError(err);
        }
    }

    public async deleteById(id: string, options: QueryUtilMethodOptions = {}) {
        try {
            await this._queryUtil.deleteById(this._tableName, id, options);
            return id;
        } catch (err) {
            throw this._transformError(err);
        }
    }

    public async deleteList(ids: string[], options: QueryUtilMethodOptions = {}) {
        try {
            if (ids.length) await this._queryUtil.deleteList(this._tableName, ids, options);
            return ids;
        } catch (err) {
            throw this._transformError(err);
        }
    }

    public async find(
        payload: QueryInput<T> = {},
        options: QueryUtilMethodOptions & QueryUtilJoinOptions<T> = {},
    ) {
        try {
            return this._queryUtil.findAndTransform(this._tableName, payload, options);
        } catch (err) {
            throw this._transformError(err);
        }
    }

    public async findOne(
        payload: QueryInputFindOne<T> = {},
        options: QueryUtilMethodOptions & QueryUtilJoinOptions<T> = {},
    ) {
        try {
            const newPayload = payload as QueryInput<T>;
            newPayload.offset = 0;
            newPayload.limit = 1;

            const results = await this.find(newPayload, options);

            return results[0] ? results[0] : undefined;
        } catch (err) {
            throw this._transformError(err);
        }
    }

    protected _transformError(err: any) {
        const logger = new Logger(this.constructor.name);
        logger.error(err);

        return err;
    }
}
