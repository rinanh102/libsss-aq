import { ModuleDatabase, Optional, SQLError, SQLErrors } from '@heronjs/common';
import { KnexClient } from '@heronjs/core';
import { Knex } from 'knex';
import {
    AllTables,
    QueryUtilJoinOptions,
    QueryUtilMethodOptions,
    FilterInput,
    QueryInput,
    SortInput,
} from '.';
import { ShortIdUtil } from '../../common';
import {
    BaseTable,
    RelationTable,
    TableRelationships,
    QueryTypes,
    RelationOptions,
    relationMetadataKey,
} from '../table';
import { FilterOperators, TransformJoinResultTypes } from './query-util.enums';

export interface IQueryUtil<T = any> {
    transaction(exec: (trx: Knex.Transaction) => Promise<any>): Promise<void>;
    create(tableName: string, dto: T, options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    createList(tableName: string, dtos: T[], options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    updateById(
        tableName: string,
        id: string,
        dto: Partial<T>,
        options?: QueryUtilMethodOptions,
    ): Knex.QueryBuilder;
    updateList(
        tableName: string,
        dtos: (Partial<T> & { id: string })[],
        options?: QueryUtilMethodOptions,
    ): Promise<void>;
    deleteById(tableName: string, id: string, options?: QueryUtilMethodOptions): Knex.QueryBuilder;
    deleteList(tableName: string, ids: string[], options?: QueryUtilMethodOptions): Promise<void>;
    find(
        tableName: string,
        payload?: QueryInput<T>,
        options?: QueryUtilMethodOptions &
            QueryUtilJoinOptions<T> & {
                tb?: BaseTable;
                relations?: RelationTable[];
            },
    ): Knex.QueryBuilder;
    transform(
        tableName: string,
        records: Optional<any[]>,
        options?: QueryUtilMethodOptions &
            QueryUtilJoinOptions<T> & {
                tb?: BaseTable;
                relations?: RelationTable[];
            },
    ): Partial<T>[];
    findAndTransform(
        tableName: string,
        payload?: QueryInput<T>,
        options?: QueryUtilMethodOptions & QueryUtilJoinOptions<T>,
    ): Promise<Partial<T>[]>;
}

export class BaseQueryUtil<T = any> implements IQueryUtil<T> {
    protected readonly _client: KnexClient;
    protected readonly _allTables: AllTables;
    private readonly _tableConstrainNameMap = new Map();

    constructor(payload: { db: ModuleDatabase<KnexClient>; tables: AllTables }) {
        const { db, tables } = payload;

        const client = db.database();
        if (!client) throw new SQLError(SQLErrors.CONNECTION_ERR, 'Database client is undefined');

        this._client = client;
        this._allTables = tables;
    }

    public async transaction(exec: (trx: Knex.Transaction) => Promise<any>) {
        await this._client.transaction((trx) => exec(trx));
    }

    public create(tableName: string, dto: T, options: QueryUtilMethodOptions = {}) {
        const tb = this._getTable(tableName);

        const record = tb.fromDTO(dto).values();

        const query = this._client(tb.TABLE_NAME).insert(record);

        if (options.trx) query.transacting(options.trx);

        return query;
    }

    public createList(tableName: string, dtos: T[], options: QueryUtilMethodOptions = {}) {
        const tb = this._getTable(tableName);

        const records = dtos.map((dto) => tb.fromDTO(dto).values());

        const query = this._client(tb.TABLE_NAME).insert(records);

        if (options.trx) query.transacting(options.trx);

        return query;
    }

    public updateById(tableName: string, id: string, dto: Partial<T>, options: QueryUtilMethodOptions = {}) {
        const tb = this._getTable(tableName);

        const record = tb.fromDTO(dto).values();

        const query = this._client(tb.TABLE_NAME)
            .update({
                ...record,
                [tb.getPrimaryKeyColumnName()]: undefined,
            })
            .where(tb.getPrimaryKeyColumnName(), id);

        if (options.trx) query.transacting(options.trx);

        return query;
    }

    public async updateList(
        tableName: string,
        dtos: (Partial<T> & { id: string })[],
        options: QueryUtilMethodOptions = {},
    ) {
        const tb = this._getTable(tableName);

        const exec = async (trx: Knex.Transaction) =>
            Promise.all(
                dtos.map((dto) => {
                    return this._client(tb.TABLE_NAME)
                        .update({
                            ...tb.fromDTO(dto).values(),
                            [tb.getPrimaryKeyColumnName()]: undefined,
                        })
                        .where(tb.getPrimaryKeyColumnName(), dto.id)
                        .transacting(trx);
                }),
            );

        if (options.trx) await exec(options.trx);
        else await this.transaction(exec);
    }

    public deleteById(tableName: string, id: string, options: QueryUtilMethodOptions = {}) {
        const tb = this._getTable(tableName);

        const query = this._client(tb.TABLE_NAME).where(tb.getPrimaryKeyColumnName(), id).delete();

        if (options.trx) query.transacting(options.trx);

        return query;
    }

    public async deleteList(tableName: string, ids: string[], options: QueryUtilMethodOptions = {}) {
        const tb = this._getTable(tableName);

        const exec = async (trx: Knex.Transaction) =>
            Promise.all(
                ids.map((id) => {
                    return this._client(tb.TABLE_NAME)
                        .delete()
                        .where(tb.getPrimaryKeyColumnName(), id)
                        .transacting(trx);
                }),
            );

        if (options.trx) await exec(options.trx);
        else await this.transaction(exec);
    }

    public find(
        tableName: string,
        payload: QueryInput<T> = {},
        options: QueryUtilMethodOptions &
            QueryUtilJoinOptions<T> & {
                tb?: BaseTable;
                relations?: RelationTable[];
            } = {},
    ) {
        const tb = options.tb ?? this._getTable(tableName);

        const relations =
            options.relations ??
            this._getRelations({
                table: tb,
                options,
            });

        const query = this._client.from(tb.TABLE_NAME);

        if (options.trx) query.transacting(options.trx);

        if (options.forUpdate) query.forUpdate();

        this._buildJoinQuery({
            query,
            relations,
            mainTable: tb,
        });
        this._buildWhereQuery({
            query,
            filter: payload.filter,
            eavFilter: payload.eavFilter,
            tables: this._allTables,
            mainTable: tb,
        });

        if (relations && relations.length && (payload.offset !== undefined || payload.limit !== undefined)) {
            const subQuery = query.clone();
            subQuery.clearSelect();
            this._buildSortQuery({
                query: subQuery,
                sort: payload.sort,
                tables: this._allTables,
                mainTable: tb,
                applyFirstLevel: true,
            });
            subQuery
                .groupBy(tb.getPrimaryKeyColumnName())
                .select(tb.getPrimaryKeyColumnName())
                .as('sub_query');

            if (payload.offset !== undefined) subQuery.offset(payload.offset);

            if (payload.limit !== undefined) subQuery.limit(payload.limit);

            query.whereIn(tb.getPrimaryKeyColumnName(), this._client.select('id').from(subQuery));
        } else {
            if (payload.offset !== undefined) query.offset(payload.offset);
            if (payload.limit !== undefined) query.limit(payload.limit);
        }

        this._buildSortQuery({
            query,
            sort: payload.sort,
            tables: this._allTables,
            mainTable: tb,
        });
        query.select(tb.getSelectionFields({ tableName: tb.TABLE_NAME }));

        return query;
    }

    public transform(
        tableName: string,
        records: Optional<any[]>,
        options: QueryUtilMethodOptions &
            QueryUtilJoinOptions<T> & {
                tb?: BaseTable;
                relations?: RelationTable[];
            } = {},
    ) {
        const tb = options.tb ?? this._getTable(tableName);

        const relations =
            options.relations ??
            this._getRelations({
                table: tb,
                options,
            });

        if (records === undefined || records.length === 0) return [];

        let finalResults = records;

        if (relations) {
            const temps: Map<string, object> = new Map();
            const items: any = {};

            records.forEach((result: { [x: string]: any }) => {
                const id = result[tb.getPrimaryKeyColumnName()];

                if (!items[id]) items[id] = result;

                relations.forEach((relation) => {
                    this._transformJoinResult({
                        result,
                        finalResult: items[id],
                        relation,
                        temps,
                        itemId: id,
                        type: TransformJoinResultTypes.MULTI,
                    });
                });
            });

            finalResults = Object.keys(items).map((key) => items[key]);
        }

        return finalResults.map((result: any) => tb.toDTO(tb.toTable<BaseTable<T>>(result)));
    }

    public async findAndTransform(
        tableName: string,
        payload: QueryInput<T> = {},
        options: QueryUtilMethodOptions & QueryUtilJoinOptions<T> = {},
    ) {
        const tb = this._getTable(tableName);

        const relations = this._getRelations({
            table: tb,
            options,
        });

        const newOptions = { ...options, tb, relations };

        const results = await this.find(tableName, payload, newOptions);
        return this.transform(tableName, results, newOptions);
    }

    private _getTable(tableName: string): BaseTable {
        const tb = this._allTables.get(tableName);
        if (!tb) throw new Error(`Table ${tableName} not found`);

        return tb;
    }

    private _getRelations({
        table,
        options,
    }: {
        table: BaseTable;
        options: QueryUtilJoinOptions<any>;
    }): Optional<RelationTable[]> {
        const relations: RelationTable[] = [];

        if (options.resolve) this._resolveRelations({ relations, resolve: options.resolve, table });

        if (!relations.length) return;

        return relations;
    }

    private _buildWhereQuery({
        query,
        filter,
        eavFilter,
        tables,
        mainTable,
        mainTableName,
    }: {
        query: Knex.QueryBuilder;
        filter?: FilterInput;
        eavFilter?: FilterInput;
        tables: AllTables;
        mainTable: BaseTable;
        mainTableName?: string;
        relationship?: TableRelationships;
    }): Knex.QueryBuilder {
        if (!filter && !eavFilter) return query;

        if (filter) {
            Object.keys(filter).forEach((field) => {
                if (filter[field] === undefined) return;

                const columnName = mainTable.getColumnName(field, mainTableName);

                if (!columnName) {
                    const relationMetadata = mainTable.getRelationMetadata(field);

                    if (relationMetadata) {
                        const relationTable = tables.get(relationMetadata.tableName)!;
                        this._buildWhereQuery({
                            query,
                            filter: filter[field] as FilterInput,
                            tables,
                            mainTable: relationTable,
                            mainTableName: this._getConstraintName(
                                mainTableName || mainTable.TABLE_NAME,
                                relationMetadata.tableName,
                                relationMetadata.localId,
                                relationMetadata.refId!,
                            ),
                        });
                    }

                    return;
                }

                const fieldFilter = filter[field];

                if (fieldFilter) {
                    Object.keys(fieldFilter).forEach((operator) => {
                        //@ts-ignore
                        const value = fieldFilter[operator];
                        this._transformWhereQuery({
                            query,
                            columnName,
                            queryType: operator,
                            value,
                        });
                    });
                }
            });
        }

        if (eavFilter && mainTable.eav) {
            const entityTable = mainTable;
            const valueTable = tables.get(mainTable.eav.tableLink);

            if (entityTable && valueTable) {
                Object.keys(eavFilter).forEach((attribute) => {
                    const attributeFilter = eavFilter[attribute]!;
                    Object.keys(attributeFilter).forEach((operator) => {
                        //@ts-ignore
                        const value = attributeFilter[operator];
                        this._transformEavWhereQuery({
                            entityTable,
                            valueTable,
                            query,
                            attribute,
                            value,
                            operator,
                        });
                    });
                });
            }
        }

        return query;
    }

    private _transformWhereQuery({
        query,
        columnName,
        queryType,
        value,
    }: {
        query: Knex.QueryBuilder;
        columnName: string;
        queryType: QueryTypes | string;
        value: any;
    }) {
        if (value === undefined || value === null) return query;

        if (typeof value === 'string') {
            try {
                value = value.normalize();
                value = JSON.parse(value);
            } catch (error) {
                // do nothing
            }
        }

        switch (queryType) {
            case FilterOperators.eq:
                if (value === null) query.whereNull(columnName);
                else query.where(columnName, '=', value);
                break;
            case FilterOperators.not:
                if (value === null) query.whereNotNull(columnName);
                else query.where(columnName, '<>', value);
                break;
            case FilterOperators.gt:
                query.where(columnName, '>', value);
                break;
            case FilterOperators.lt:
                query.where(columnName, '<', value);
                break;
            case FilterOperators.gte:
                query.where(columnName, '>=', value);
                break;
            case FilterOperators.lte:
                query.where(columnName, '<=', value);
                break;
            case FilterOperators.in:
                query.whereIn(columnName, value);
                break;
            case FilterOperators.notIn:
                query.whereNotIn(columnName, value);
                break;
            case FilterOperators.isNull:
                query.whereNull(columnName);
                break;
            case FilterOperators.isNotNull:
                query.whereNotNull(columnName);
                break;
            case FilterOperators.isTrue:
                query.where(columnName, true);
                break;
            case FilterOperators.isFalse:
                query.where(columnName, false);
                break;
            case FilterOperators.contains:
                query.where(columnName, 'ILIKE', `%${value}%`);
                break;
            case FilterOperators.startWith:
                query.where(columnName, 'ILIKE', `${value}%`);
                break;
            case FilterOperators.endWith:
                query.where(columnName, 'ILIKE', `%${value}`);
                break;
            case FilterOperators.group:
                query.where((subQuery) => {
                    Object.keys(value).forEach((subOperator) => {
                        //@ts-ignore
                        const subValue = value[subOperator];
                        this._transformWhereQuery({
                            query: subQuery,
                            columnName,
                            queryType: subOperator,
                            value: subValue,
                        });
                    });
                });
                break;
            case FilterOperators.orEq:
                query.orWhere(columnName, '=', value);
                break;
            case FilterOperators.orNot:
                query.orWhere(columnName, '<>', value);
                break;
            case FilterOperators.orGt:
                query.orWhere(columnName, '>', value);
                break;
            case FilterOperators.orLt:
                query.orWhere(columnName, '<', value);
                break;
            case FilterOperators.orGte:
                query.orWhere(columnName, '>=', value);
                break;
            case FilterOperators.orLte:
                query.orWhere(columnName, '<=', value);
                break;
            case FilterOperators.orIn:
                query.orWhereIn(columnName, value);
                break;
            case FilterOperators.orNotIn:
                query.orWhereNotIn(columnName, value);
                break;
            case FilterOperators.orIsNull:
                query.orWhereNull(columnName);
                break;
            case FilterOperators.orIsNotNull:
                query.orWhereNotNull(columnName);
                break;
            case FilterOperators.orIsTrue:
                query.orWhere(columnName, true);
                break;
            case FilterOperators.orIsFalse:
                query.orWhere(columnName, false);
                break;
            case FilterOperators.orContains:
                query.orWhere(columnName, 'ILIKE', `%${value}%`);
                break;
            case FilterOperators.orStartWith:
                query.orWhere(columnName, 'ILIKE', `${value}%`);
                break;
            case FilterOperators.orEndWith:
                query.orWhere(columnName, 'ILIKE', `%${value}`);
                break;
            case FilterOperators.orGroup:
                query.orWhere((subQuery) => {
                    if (value && Array.isArray(value)) {
                        value.forEach((fieldFilter) => {
                            if (fieldFilter) {
                                Object.keys(fieldFilter).forEach((subOperator) => {
                                    //@ts-ignore
                                    const subValue = fieldFilter[subOperator];
                                    this._transformWhereQuery({
                                        query: subQuery,
                                        columnName,
                                        queryType: subOperator,
                                        value: subValue,
                                    });
                                });
                            }
                        });
                    }
                });
                break;
            default:
                break;
        }

        return query;
    }

    private _transformEavWhereQuery({
        entityTable,
        valueTable,
        query,
        attribute,
        value,
        operator,
    }: {
        entityTable: BaseTable;
        valueTable: BaseTable;
        query: Knex.QueryBuilder;
        attribute: string;
        value: string;
        operator: string;
    }) {
        query.whereExists((knex) => {
            const subQuery = knex
                .from(valueTable.TABLE_NAME)
                .whereRaw(
                    `${valueTable.getColumnName(
                        valueTable.eavColumnNames.entity,
                    )} = ${entityTable.getPrimaryKeyColumnName()}`,
                )
                .where(valueTable.getColumnName(valueTable.eavColumnNames.attribute)!, attribute);

            this._transformWhereQuery({
                query: subQuery,
                columnName: valueTable.getColumnName('value')!,
                queryType: operator,
                value,
            });

            return subQuery;
        });
    }

    private _buildSortQuery({
        query,
        sort,
        tables,
        mainTable,
        mainTableName,
        applyFirstLevel,
    }: {
        query: Knex.QueryBuilder;
        sort?: SortInput;
        tables: AllTables;
        mainTable: BaseTable;
        mainTableName?: string;
        applyFirstLevel?: boolean;
    }): Knex.QueryBuilder {
        if (!sort) return query;

        if (typeof sort === 'object') {
            Object.keys(sort).forEach((field) => {
                if (!sort[field]) return;

                // @ts-ignore
                const columnName = mainTable.getColumnName(field, mainTableName);

                if (!columnName && !applyFirstLevel) {
                    const relationMetadata = mainTable.getRelationMetadata(field);
                    const relationTable = tables.get(relationMetadata.tableName)!;
                    if (relationMetadata) {
                        this._buildSortQuery({
                            query,
                            sort: sort[field] as SortInput,
                            tables,
                            mainTable: relationTable,
                            mainTableName: this._getConstraintName(
                                mainTableName || mainTable.TABLE_NAME,
                                relationMetadata.tableName,
                                relationMetadata.localId,
                                relationMetadata.refId!,
                            ),
                        });
                    }
                    return;
                }

                if (columnName) {
                    const order = sort[field] as string;
                    if (order) {
                        query.select(columnName);
                        query.orderBy(columnName, order);
                    }
                }
            });
        }

        return query;
    }

    private _buildJoinQuery({
        query,
        relations,
        mainTable,
        isSelect = true,
        mainTableName,
    }: {
        query: Knex.QueryBuilder;
        relations: Optional<RelationTable[]>;
        mainTable: BaseTable;
        isSelect?: boolean;
        mainTableName?: string;
    }): Knex.QueryBuilder {
        if (relations) {
            relations.forEach((relation) => {
                const relationTable = this._getTable(relation.tableName)!;

                query.leftJoin(
                    `${relationTable.TABLE_NAME} AS ${relation.constraintName}`,
                    `${mainTableName ? mainTableName : mainTable.TABLE_NAME}.${relation.localId}`,
                    `${relation.constraintName}.${relation.refId}`,
                );

                if (isSelect)
                    query.select(relationTable.getSelectionFields({ tableName: relation.constraintName }));

                if (relation.children && relation.children.length) {
                    this._buildJoinQuery({
                        query,
                        relations: relation.children,
                        mainTable: relationTable,
                        mainTableName: relation.constraintName,
                        isSelect,
                    });
                }
            });
        }

        return query;
    }

    private _transformJoinResult({
        result,
        finalResult,
        relation,
        temps,
        type = TransformJoinResultTypes.SINGLE,
        itemId,
    }: {
        result: any;
        finalResult: any;
        relation: RelationTable;
        temps: Map<string, object>;
        type?: TransformJoinResultTypes;
        itemId?: string;
    }): void {
        const relationTable: BaseTable = this._getTable(relation.tableName)!;

        const columnName = relationTable.getPrimaryKeyColumnName(relation.constraintName);

        if (!columnName) return;

        const relationId = result[columnName];

        const relationTableColumnNames = relationTable.getColumnNames({ tableName: relation.constraintName });

        let temp: any;

        switch (type) {
            case TransformJoinResultTypes.SINGLE:
                temp = temps.get(relation.name);
                break;
            case TransformJoinResultTypes.MULTI:
                // eslint-disable-next-line no-case-declarations
                const tempId = `${itemId}_${relation.constraintName}`;

                if (!temps.get(tempId)) temps.set(tempId, {});

                temp = temps.get(tempId);
                break;
            default:
                break;
        }

        switch (relation.relationship) {
            case TableRelationships.ONE_TO_ONE:
            case TableRelationships.MANY_TO_ONE:
                relationTableColumnNames.forEach(([name, joinName]) => (temp[name] = result[joinName]));

                if (relation.children && relation.children.length) {
                    relation.children.forEach((childRelation) => {
                        this._transformJoinResult({
                            result,
                            finalResult: temp,
                            relation: childRelation,
                            temps,
                            type,
                        });
                    });
                }

                finalResult[relation.name] =
                    relationId === null ? null : relationTable.toDTO(relationTable.toTable(temp));
                return;
            case TableRelationships.ONE_TO_MANY:
            case TableRelationships.MANY_TO_MANY:
                if (temp[relationId] && !(relation.children && relation.children.length)) return;

                // eslint-disable-next-line no-case-declarations
                let isDuplicate = false;

                if (!temp[relationId])
                    switch (type) {
                        case TransformJoinResultTypes.SINGLE:
                            break;
                        case TransformJoinResultTypes.MULTI:
                            if (!finalResult[relation.name]) finalResult[relation.name] = [];
                            break;
                        default:
                            break;
                    }
                else {
                    isDuplicate = true;
                }

                if (relationId === null) return;

                if (!temp[relationId]) {
                    temp[relationId] = {};
                    relationTableColumnNames.forEach(
                        ([name, joinName]) => (temp[relationId][name] = result[joinName]),
                    );
                }

                if (relation.children && relation.children.length) {
                    relation.children.forEach((childRelation) => {
                        this._transformJoinResult({
                            result,
                            finalResult: temp[relationId],
                            relation: childRelation,
                            temps,
                            type,
                        });
                    });
                }

                if (isDuplicate) return;

                finalResult[relation.name].push(relationTable.toDTO(relationTable.toTable(temp[relationId])));
                break;
            default:
                break;
        }
    }

    private _resolveRelations({
        relations,
        resolve,
        table,
        tableName,
    }: {
        relations: RelationTable[];
        resolve: any[];
        table: BaseTable;
        tableName?: string;
    }) {
        resolve.forEach((item) => {
            if (typeof item === 'string') {
                const relationMetadata: RelationOptions = Reflect.getMetadata(
                    relationMetadataKey,
                    table,
                    item,
                );
                const relation = {
                    ...relationMetadata,
                    constraintName: this._getConstraintName(
                        tableName || table.TABLE_NAME,
                        relationMetadata.tableName,
                        relationMetadata.localId,
                        relationMetadata.refId!,
                    ),
                } as RelationTable;
                relations.push(relation);
            } else if (typeof item === 'object') {
                Object.keys(item).forEach((key) => {
                    const relationMetadata: RelationOptions = Reflect.getMetadata(
                        relationMetadataKey,
                        table,
                        key,
                    );
                    const relation = {
                        ...relationMetadata,
                        constraintName: this._getConstraintName(
                            tableName || table.TABLE_NAME,
                            relationMetadata.tableName,
                            relationMetadata.localId,
                            relationMetadata.refId!,
                        ),
                        children: [],
                    } as RelationTable;
                    relations.push(relation);
                    const childTable = this._getTable(relationMetadata.tableName)!;
                    this._resolveRelations({
                        relations: relation.children!,
                        resolve: item[key],
                        table: childTable,
                        tableName: relation.constraintName,
                    });
                });
            }
        });
    }

    private _getConstraintName(localTableName: string, refTableName: string, localId: string, refId: string) {
        const name = `${localTableName}_${refTableName}__${localId}_${refId}`;
        if (!this._tableConstrainNameMap.get(name))
            this._tableConstrainNameMap.set(name, ShortIdUtil.instance.randomUUID(5));
        return this._tableConstrainNameMap.get(name);
    }
}
