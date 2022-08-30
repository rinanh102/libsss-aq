import { Nullable } from '@heronjs/common';
import {
    tableNameMetadataKey,
    tableEavMetadataKey,
    eavEntityMetadataKey,
    eavAttributeMetadataKey,
    tablePrimaryKeyMetadataKey,
    tablePrimaryKeyColumnNameMetadataKey,
    ColumnOptions,
    columnMetadataKey,
    RelationOptions,
    relationMetadataKey,
} from './decorators';

export class BaseTable<T = any> {
    public get TABLE_NAME(): string {
        return Reflect.getMetadata(tableNameMetadataKey, this);
    }

    public get eav(): {
        tableLink: string;
    } {
        return Reflect.getMetadata(tableEavMetadataKey, this);
    }

    public get eavColumnNames(): {
        entity: string;
        attribute: string;
    } {
        return {
            entity: Reflect.getMetadata(eavEntityMetadataKey, this),
            attribute: Reflect.getMetadata(eavAttributeMetadataKey, this),
        };
    }

    public getSelectionFields({ tableName }: { tableName?: string } = {}): string[] {
        const fields: string[] = [];

        Object.keys(this).forEach((key) => {
            const columnMetadata = this.getColumnMetadata(key);

            if (columnMetadata) {
                const filed = [tableName ? `${tableName}.` : '', columnMetadata.name].join('');
                fields.push(filed + ' as ' + filed);
            }
        });

        return fields;
    }

    public getColumnNames({ tableName }: { tableName?: string } = {}): string[][] {
        const names: string[][] = [];
        Object.keys(this).forEach((key) => {
            const columnMetadata = this.getColumnMetadata(key);

            if (columnMetadata) {
                const name = [this.TABLE_NAME, columnMetadata.name].join('.');
                const joinName = this.getColumnName(key, tableName);

                if (joinName) names.push([name, joinName]);
            }
        });
        return names;
    }

    public getColumnName(columnName: string, tableName?: string): Nullable<string> {
        const columnMetadata = this.getColumnMetadata(columnName);

        if (columnMetadata)
            return [
                tableName ? `${tableName}.` : `${this.TABLE_NAME}.`,
                columnMetadata.name || columnName,
            ].join('');
        return null;
    }

    public getPrimaryKey(): string {
        return Reflect.getMetadata(tablePrimaryKeyMetadataKey, this) || 'id';
    }

    public getPrimaryKeyColumnName(tableName?: string): string {
        const primaryKey = Reflect.getMetadata(tablePrimaryKeyColumnNameMetadataKey, this) || 'id';
        return [tableName ? `${tableName}.` : `${this.TABLE_NAME}.`, primaryKey].join('');
    }

    public toTable<K extends BaseTable<T>>(payload: any): K {
        if (payload === undefined || payload === null) return payload;
        // @ts-ignore
        return new this.constructor().new(payload);
    }

    public values({ includes }: { includes?: any[] } = {}): any {
        const result: any = {};

        Object.keys(this).forEach((key) => {
            if (includes && !includes.includes(key)) return;

            const columnMetadata = this.getColumnMetadata(key);

            // @ts-ignore
            let value = this[key];
            if (typeof value === 'string') value = value.normalize();

            if (columnMetadata) {
                if (columnMetadata.recordParser) {
                    result[columnMetadata.name!] = columnMetadata.recordParser(value, this);
                } else {
                    result[columnMetadata.name!] = value;
                }
            }
        });

        return result;
    }

    public fromDTO(dto: Partial<T>): BaseTable<Partial<T>> {
        if (dto === undefined || dto === null) return dto as any;
        // @ts-ignore
        return new this.constructor().set(dto);
    }

    public toDTO(table: BaseTable<Partial<T>>): Partial<T> {
        if (table === undefined || table === null) return table as any;

        const payload = {};

        Object.keys(table).forEach((key) => {
            // @ts-ignore
            payload[key] = table[key];
        });

        return payload;
    }

    private new(payload: any) {
        Object.keys(this).forEach((key) => {
            const columnMetadata = this.getColumnMetadata(key);
            if (columnMetadata) {
                if (columnMetadata.dtoParser) {
                    // @ts-ignore
                    this[key] = columnMetadata.dtoParser(
                        payload[this.getColumnAliasName(columnMetadata.name!)],
                        payload,
                    );
                } else {
                    // @ts-ignore
                    this[key] = payload[this.getColumnAliasName(columnMetadata.name)];
                }
            }

            const relationMetadata = this.getRelationMetadata(key);
            if (relationMetadata) {
                // @ts-ignore
                this[key] = payload[relationMetadata.name];
            }
        });
        return this;
    }

    private set(dto: Partial<T>) {
        Object.keys(this).forEach((key) => {
            // @ts-ignore
            this[key] = dto[key];
        });
        return this;
    }

    private getColumnAliasName(columnName: string) {
        return this.TABLE_NAME + '.' + columnName;
    }

    private getColumnMetadata(propertyKey: string | symbol): ColumnOptions {
        return Reflect.getMetadata(columnMetadataKey, this, propertyKey);
    }

    public getRelationMetadata(propertyKey: string | symbol): RelationOptions {
        return Reflect.getMetadata(relationMetadataKey, this, propertyKey);
    }
}
