import { Nullable } from '@heronjs/common';
import { RelationOptions } from './decorators';
export declare class BaseTable<T = any> {
    get TABLE_NAME(): string;
    get eav(): {
        tableLink: string;
    };
    get eavColumnNames(): {
        entity: string;
        attribute: string;
    };
    getSelectionFields({ tableName }?: {
        tableName?: string;
    }): string[];
    getColumnNames({ tableName }?: {
        tableName?: string;
    }): string[][];
    getColumnName(columnName: string, tableName?: string): Nullable<string>;
    getPrimaryKey(): string;
    getPrimaryKeyColumnName(tableName?: string): string;
    toTable<K extends BaseTable<T>>(payload: any): K;
    values({ includes }?: {
        includes?: any[];
    }): any;
    fromDTO(dto: Partial<T>): BaseTable<Partial<T>>;
    toDTO(table: BaseTable<Partial<T>>): Partial<T>;
    private new;
    private set;
    private getColumnAliasName;
    private getColumnMetadata;
    getRelationMetadata(propertyKey: string | symbol): RelationOptions;
}
