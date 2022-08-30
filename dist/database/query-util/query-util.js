"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueryUtil = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@heronjs/common");
const common_2 = require("../../common");
const table_1 = require("../table");
const query_util_enums_1 = require("./query-util.enums");
class BaseQueryUtil {
    constructor(payload) {
        this._tableConstrainNameMap = new Map();
        const { db, tables } = payload;
        const client = db.database();
        if (!client)
            throw new common_1.SQLError(common_1.SQLErrors.CONNECTION_ERR, 'Database client is undefined');
        this._client = client;
        this._allTables = tables;
    }
    transaction(exec) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._client.transaction((trx) => exec(trx));
        });
    }
    create(tableName, dto, options = {}) {
        const tb = this._getTable(tableName);
        const record = tb.fromDTO(dto).values();
        const query = this._client(tb.TABLE_NAME).insert(record);
        if (options.trx)
            query.transacting(options.trx);
        return query;
    }
    createList(tableName, dtos, options = {}) {
        const tb = this._getTable(tableName);
        const records = dtos.map((dto) => tb.fromDTO(dto).values());
        const query = this._client(tb.TABLE_NAME).insert(records);
        if (options.trx)
            query.transacting(options.trx);
        return query;
    }
    updateById(tableName, id, dto, options = {}) {
        const tb = this._getTable(tableName);
        const record = tb.fromDTO(dto).values();
        const query = this._client(tb.TABLE_NAME)
            .update(Object.assign(Object.assign({}, record), { [tb.getPrimaryKeyColumnName()]: undefined }))
            .where(tb.getPrimaryKeyColumnName(), id);
        if (options.trx)
            query.transacting(options.trx);
        return query;
    }
    updateList(tableName, dtos, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tb = this._getTable(tableName);
            const exec = (trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return Promise.all(dtos.map((dto) => {
                    return this._client(tb.TABLE_NAME)
                        .update(Object.assign(Object.assign({}, tb.fromDTO(dto).values()), { [tb.getPrimaryKeyColumnName()]: undefined }))
                        .where(tb.getPrimaryKeyColumnName(), dto.id)
                        .transacting(trx);
                }));
            });
            if (options.trx)
                yield exec(options.trx);
            else
                yield this.transaction(exec);
        });
    }
    deleteById(tableName, id, options = {}) {
        const tb = this._getTable(tableName);
        const query = this._client(tb.TABLE_NAME).where(tb.getPrimaryKeyColumnName(), id).delete();
        if (options.trx)
            query.transacting(options.trx);
        return query;
    }
    deleteList(tableName, ids, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tb = this._getTable(tableName);
            const exec = (trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return Promise.all(ids.map((id) => {
                    return this._client(tb.TABLE_NAME)
                        .delete()
                        .where(tb.getPrimaryKeyColumnName(), id)
                        .transacting(trx);
                }));
            });
            if (options.trx)
                yield exec(options.trx);
            else
                yield this.transaction(exec);
        });
    }
    find(tableName, payload = {}, options = {}) {
        var _a, _b;
        const tb = (_a = options.tb) !== null && _a !== void 0 ? _a : this._getTable(tableName);
        const relations = (_b = options.relations) !== null && _b !== void 0 ? _b : this._getRelations({
            table: tb,
            options,
        });
        const query = this._client.from(tb.TABLE_NAME);
        if (options.trx)
            query.transacting(options.trx);
        if (options.forUpdate)
            query.forUpdate();
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
            if (payload.offset !== undefined)
                subQuery.offset(payload.offset);
            if (payload.limit !== undefined)
                subQuery.limit(payload.limit);
            query.whereIn(tb.getPrimaryKeyColumnName(), this._client.select('id').from(subQuery));
        }
        else {
            if (payload.offset !== undefined)
                query.offset(payload.offset);
            if (payload.limit !== undefined)
                query.limit(payload.limit);
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
    transform(tableName, records, options = {}) {
        var _a, _b;
        const tb = (_a = options.tb) !== null && _a !== void 0 ? _a : this._getTable(tableName);
        const relations = (_b = options.relations) !== null && _b !== void 0 ? _b : this._getRelations({
            table: tb,
            options,
        });
        if (records === undefined || records.length === 0)
            return [];
        let finalResults = records;
        if (relations) {
            const temps = new Map();
            const items = {};
            records.forEach((result) => {
                const id = result[tb.getPrimaryKeyColumnName()];
                if (!items[id])
                    items[id] = result;
                relations.forEach((relation) => {
                    this._transformJoinResult({
                        result,
                        finalResult: items[id],
                        relation,
                        temps,
                        itemId: id,
                        type: query_util_enums_1.TransformJoinResultTypes.MULTI,
                    });
                });
            });
            finalResults = Object.keys(items).map((key) => items[key]);
        }
        return finalResults.map((result) => tb.toDTO(tb.toTable(result)));
    }
    findAndTransform(tableName, payload = {}, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tb = this._getTable(tableName);
            const relations = this._getRelations({
                table: tb,
                options,
            });
            const newOptions = Object.assign(Object.assign({}, options), { tb, relations });
            const results = yield this.find(tableName, payload, newOptions);
            return this.transform(tableName, results, newOptions);
        });
    }
    _getTable(tableName) {
        const tb = this._allTables.get(tableName);
        if (!tb)
            throw new Error(`Table ${tableName} not found`);
        return tb;
    }
    _getRelations({ table, options, }) {
        const relations = [];
        if (options.resolve)
            this._resolveRelations({ relations, resolve: options.resolve, table });
        if (!relations.length)
            return;
        return relations;
    }
    _buildWhereQuery({ query, filter, eavFilter, tables, mainTable, mainTableName, }) {
        if (!filter && !eavFilter)
            return query;
        if (filter) {
            Object.keys(filter).forEach((field) => {
                if (filter[field] === undefined)
                    return;
                const columnName = mainTable.getColumnName(field, mainTableName);
                if (!columnName) {
                    const relationMetadata = mainTable.getRelationMetadata(field);
                    if (relationMetadata) {
                        const relationTable = tables.get(relationMetadata.tableName);
                        this._buildWhereQuery({
                            query,
                            filter: filter[field],
                            tables,
                            mainTable: relationTable,
                            mainTableName: this._getConstraintName(mainTableName || mainTable.TABLE_NAME, relationMetadata.tableName, relationMetadata.localId, relationMetadata.refId),
                        });
                    }
                    return;
                }
                const fieldFilter = filter[field];
                if (fieldFilter) {
                    Object.keys(fieldFilter).forEach((operator) => {
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
                    const attributeFilter = eavFilter[attribute];
                    Object.keys(attributeFilter).forEach((operator) => {
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
    _transformWhereQuery({ query, columnName, queryType, value, }) {
        if (value === undefined || value === null)
            return query;
        if (typeof value === 'string') {
            try {
                value = value.normalize();
                value = JSON.parse(value);
            }
            catch (error) {
            }
        }
        switch (queryType) {
            case query_util_enums_1.FilterOperators.eq:
                if (value === null)
                    query.whereNull(columnName);
                else
                    query.where(columnName, '=', value);
                break;
            case query_util_enums_1.FilterOperators.not:
                if (value === null)
                    query.whereNotNull(columnName);
                else
                    query.where(columnName, '<>', value);
                break;
            case query_util_enums_1.FilterOperators.gt:
                query.where(columnName, '>', value);
                break;
            case query_util_enums_1.FilterOperators.lt:
                query.where(columnName, '<', value);
                break;
            case query_util_enums_1.FilterOperators.gte:
                query.where(columnName, '>=', value);
                break;
            case query_util_enums_1.FilterOperators.lte:
                query.where(columnName, '<=', value);
                break;
            case query_util_enums_1.FilterOperators.in:
                query.whereIn(columnName, value);
                break;
            case query_util_enums_1.FilterOperators.notIn:
                query.whereNotIn(columnName, value);
                break;
            case query_util_enums_1.FilterOperators.isNull:
                query.whereNull(columnName);
                break;
            case query_util_enums_1.FilterOperators.isNotNull:
                query.whereNotNull(columnName);
                break;
            case query_util_enums_1.FilterOperators.isTrue:
                query.where(columnName, true);
                break;
            case query_util_enums_1.FilterOperators.isFalse:
                query.where(columnName, false);
                break;
            case query_util_enums_1.FilterOperators.contains:
                query.where(columnName, 'ILIKE', `%${value}%`);
                break;
            case query_util_enums_1.FilterOperators.startWith:
                query.where(columnName, 'ILIKE', `${value}%`);
                break;
            case query_util_enums_1.FilterOperators.endWith:
                query.where(columnName, 'ILIKE', `%${value}`);
                break;
            case query_util_enums_1.FilterOperators.group:
                query.where((subQuery) => {
                    Object.keys(value).forEach((subOperator) => {
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
            case query_util_enums_1.FilterOperators.orEq:
                query.orWhere(columnName, '=', value);
                break;
            case query_util_enums_1.FilterOperators.orNot:
                query.orWhere(columnName, '<>', value);
                break;
            case query_util_enums_1.FilterOperators.orGt:
                query.orWhere(columnName, '>', value);
                break;
            case query_util_enums_1.FilterOperators.orLt:
                query.orWhere(columnName, '<', value);
                break;
            case query_util_enums_1.FilterOperators.orGte:
                query.orWhere(columnName, '>=', value);
                break;
            case query_util_enums_1.FilterOperators.orLte:
                query.orWhere(columnName, '<=', value);
                break;
            case query_util_enums_1.FilterOperators.orIn:
                query.orWhereIn(columnName, value);
                break;
            case query_util_enums_1.FilterOperators.orNotIn:
                query.orWhereNotIn(columnName, value);
                break;
            case query_util_enums_1.FilterOperators.orIsNull:
                query.orWhereNull(columnName);
                break;
            case query_util_enums_1.FilterOperators.orIsNotNull:
                query.orWhereNotNull(columnName);
                break;
            case query_util_enums_1.FilterOperators.orIsTrue:
                query.orWhere(columnName, true);
                break;
            case query_util_enums_1.FilterOperators.orIsFalse:
                query.orWhere(columnName, false);
                break;
            case query_util_enums_1.FilterOperators.orContains:
                query.orWhere(columnName, 'ILIKE', `%${value}%`);
                break;
            case query_util_enums_1.FilterOperators.orStartWith:
                query.orWhere(columnName, 'ILIKE', `${value}%`);
                break;
            case query_util_enums_1.FilterOperators.orEndWith:
                query.orWhere(columnName, 'ILIKE', `%${value}`);
                break;
            case query_util_enums_1.FilterOperators.orGroup:
                query.orWhere((subQuery) => {
                    if (value && Array.isArray(value)) {
                        value.forEach((fieldFilter) => {
                            if (fieldFilter) {
                                Object.keys(fieldFilter).forEach((subOperator) => {
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
    _transformEavWhereQuery({ entityTable, valueTable, query, attribute, value, operator, }) {
        query.whereExists((knex) => {
            const subQuery = knex
                .from(valueTable.TABLE_NAME)
                .whereRaw(`${valueTable.getColumnName(valueTable.eavColumnNames.entity)} = ${entityTable.getPrimaryKeyColumnName()}`)
                .where(valueTable.getColumnName(valueTable.eavColumnNames.attribute), attribute);
            this._transformWhereQuery({
                query: subQuery,
                columnName: valueTable.getColumnName('value'),
                queryType: operator,
                value,
            });
            return subQuery;
        });
    }
    _buildSortQuery({ query, sort, tables, mainTable, mainTableName, applyFirstLevel, }) {
        if (!sort)
            return query;
        if (typeof sort === 'object') {
            Object.keys(sort).forEach((field) => {
                if (!sort[field])
                    return;
                const columnName = mainTable.getColumnName(field, mainTableName);
                if (!columnName && !applyFirstLevel) {
                    const relationMetadata = mainTable.getRelationMetadata(field);
                    const relationTable = tables.get(relationMetadata.tableName);
                    if (relationMetadata) {
                        this._buildSortQuery({
                            query,
                            sort: sort[field],
                            tables,
                            mainTable: relationTable,
                            mainTableName: this._getConstraintName(mainTableName || mainTable.TABLE_NAME, relationMetadata.tableName, relationMetadata.localId, relationMetadata.refId),
                        });
                    }
                    return;
                }
                if (columnName) {
                    const order = sort[field];
                    if (order) {
                        query.select(columnName);
                        query.orderBy(columnName, order);
                    }
                }
            });
        }
        return query;
    }
    _buildJoinQuery({ query, relations, mainTable, isSelect = true, mainTableName, }) {
        if (relations) {
            relations.forEach((relation) => {
                const relationTable = this._getTable(relation.tableName);
                query.leftJoin(`${relationTable.TABLE_NAME} AS ${relation.constraintName}`, `${mainTableName ? mainTableName : mainTable.TABLE_NAME}.${relation.localId}`, `${relation.constraintName}.${relation.refId}`);
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
    _transformJoinResult({ result, finalResult, relation, temps, type = query_util_enums_1.TransformJoinResultTypes.SINGLE, itemId, }) {
        const relationTable = this._getTable(relation.tableName);
        const columnName = relationTable.getPrimaryKeyColumnName(relation.constraintName);
        if (!columnName)
            return;
        const relationId = result[columnName];
        const relationTableColumnNames = relationTable.getColumnNames({ tableName: relation.constraintName });
        let temp;
        switch (type) {
            case query_util_enums_1.TransformJoinResultTypes.SINGLE:
                temp = temps.get(relation.name);
                break;
            case query_util_enums_1.TransformJoinResultTypes.MULTI:
                const tempId = `${itemId}_${relation.constraintName}`;
                if (!temps.get(tempId))
                    temps.set(tempId, {});
                temp = temps.get(tempId);
                break;
            default:
                break;
        }
        switch (relation.relationship) {
            case table_1.TableRelationships.ONE_TO_ONE:
            case table_1.TableRelationships.MANY_TO_ONE:
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
            case table_1.TableRelationships.ONE_TO_MANY:
            case table_1.TableRelationships.MANY_TO_MANY:
                if (temp[relationId] && !(relation.children && relation.children.length))
                    return;
                let isDuplicate = false;
                if (!temp[relationId])
                    switch (type) {
                        case query_util_enums_1.TransformJoinResultTypes.SINGLE:
                            break;
                        case query_util_enums_1.TransformJoinResultTypes.MULTI:
                            if (!finalResult[relation.name])
                                finalResult[relation.name] = [];
                            break;
                        default:
                            break;
                    }
                else {
                    isDuplicate = true;
                }
                if (relationId === null)
                    return;
                if (!temp[relationId]) {
                    temp[relationId] = {};
                    relationTableColumnNames.forEach(([name, joinName]) => (temp[relationId][name] = result[joinName]));
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
                if (isDuplicate)
                    return;
                finalResult[relation.name].push(relationTable.toDTO(relationTable.toTable(temp[relationId])));
                break;
            default:
                break;
        }
    }
    _resolveRelations({ relations, resolve, table, tableName, }) {
        resolve.forEach((item) => {
            if (typeof item === 'string') {
                const relationMetadata = Reflect.getMetadata(table_1.relationMetadataKey, table, item);
                const relation = Object.assign(Object.assign({}, relationMetadata), { constraintName: this._getConstraintName(tableName || table.TABLE_NAME, relationMetadata.tableName, relationMetadata.localId, relationMetadata.refId) });
                relations.push(relation);
            }
            else if (typeof item === 'object') {
                Object.keys(item).forEach((key) => {
                    const relationMetadata = Reflect.getMetadata(table_1.relationMetadataKey, table, key);
                    const relation = Object.assign(Object.assign({}, relationMetadata), { constraintName: this._getConstraintName(tableName || table.TABLE_NAME, relationMetadata.tableName, relationMetadata.localId, relationMetadata.refId), children: [] });
                    relations.push(relation);
                    const childTable = this._getTable(relationMetadata.tableName);
                    this._resolveRelations({
                        relations: relation.children,
                        resolve: item[key],
                        table: childTable,
                        tableName: relation.constraintName,
                    });
                });
            }
        });
    }
    _getConstraintName(localTableName, refTableName, localId, refId) {
        const name = `${localTableName}_${refTableName}__${localId}_${refId}`;
        if (!this._tableConstrainNameMap.get(name))
            this._tableConstrainNameMap.set(name, common_2.ShortIdUtil.instance.randomUUID(5));
        return this._tableConstrainNameMap.get(name);
    }
}
exports.BaseQueryUtil = BaseQueryUtil;
