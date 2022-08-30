"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTable = void 0;
const decorators_1 = require("./decorators");
class BaseTable {
    get TABLE_NAME() {
        return Reflect.getMetadata(decorators_1.tableNameMetadataKey, this);
    }
    get eav() {
        return Reflect.getMetadata(decorators_1.tableEavMetadataKey, this);
    }
    get eavColumnNames() {
        return {
            entity: Reflect.getMetadata(decorators_1.eavEntityMetadataKey, this),
            attribute: Reflect.getMetadata(decorators_1.eavAttributeMetadataKey, this),
        };
    }
    getSelectionFields({ tableName } = {}) {
        const fields = [];
        Object.keys(this).forEach((key) => {
            const columnMetadata = this.getColumnMetadata(key);
            if (columnMetadata) {
                const filed = [tableName ? `${tableName}.` : '', columnMetadata.name].join('');
                fields.push(filed + ' as ' + filed);
            }
        });
        return fields;
    }
    getColumnNames({ tableName } = {}) {
        const names = [];
        Object.keys(this).forEach((key) => {
            const columnMetadata = this.getColumnMetadata(key);
            if (columnMetadata) {
                const name = [this.TABLE_NAME, columnMetadata.name].join('.');
                const joinName = this.getColumnName(key, tableName);
                if (joinName)
                    names.push([name, joinName]);
            }
        });
        return names;
    }
    getColumnName(columnName, tableName) {
        const columnMetadata = this.getColumnMetadata(columnName);
        if (columnMetadata)
            return [
                tableName ? `${tableName}.` : `${this.TABLE_NAME}.`,
                columnMetadata.name || columnName,
            ].join('');
        return null;
    }
    getPrimaryKey() {
        return Reflect.getMetadata(decorators_1.tablePrimaryKeyMetadataKey, this) || 'id';
    }
    getPrimaryKeyColumnName(tableName) {
        const primaryKey = Reflect.getMetadata(decorators_1.tablePrimaryKeyColumnNameMetadataKey, this) || 'id';
        return [tableName ? `${tableName}.` : `${this.TABLE_NAME}.`, primaryKey].join('');
    }
    toTable(payload) {
        if (payload === undefined || payload === null)
            return payload;
        return new this.constructor().new(payload);
    }
    values({ includes } = {}) {
        const result = {};
        Object.keys(this).forEach((key) => {
            if (includes && !includes.includes(key))
                return;
            const columnMetadata = this.getColumnMetadata(key);
            let value = this[key];
            if (typeof value === 'string')
                value = value.normalize();
            if (columnMetadata) {
                if (columnMetadata.recordParser) {
                    result[columnMetadata.name] = columnMetadata.recordParser(value, this);
                }
                else {
                    result[columnMetadata.name] = value;
                }
            }
        });
        return result;
    }
    fromDTO(dto) {
        if (dto === undefined || dto === null)
            return dto;
        return new this.constructor().set(dto);
    }
    toDTO(table) {
        if (table === undefined || table === null)
            return table;
        const payload = {};
        Object.keys(table).forEach((key) => {
            payload[key] = table[key];
        });
        return payload;
    }
    new(payload) {
        Object.keys(this).forEach((key) => {
            const columnMetadata = this.getColumnMetadata(key);
            if (columnMetadata) {
                if (columnMetadata.dtoParser) {
                    this[key] = columnMetadata.dtoParser(payload[this.getColumnAliasName(columnMetadata.name)], payload);
                }
                else {
                    this[key] = payload[this.getColumnAliasName(columnMetadata.name)];
                }
            }
            const relationMetadata = this.getRelationMetadata(key);
            if (relationMetadata) {
                this[key] = payload[relationMetadata.name];
            }
        });
        return this;
    }
    set(dto) {
        Object.keys(this).forEach((key) => {
            this[key] = dto[key];
        });
        return this;
    }
    getColumnAliasName(columnName) {
        return this.TABLE_NAME + '.' + columnName;
    }
    getColumnMetadata(propertyKey) {
        return Reflect.getMetadata(decorators_1.columnMetadataKey, this, propertyKey);
    }
    getRelationMetadata(propertyKey) {
        return Reflect.getMetadata(decorators_1.relationMetadataKey, this, propertyKey);
    }
}
exports.BaseTable = BaseTable;
