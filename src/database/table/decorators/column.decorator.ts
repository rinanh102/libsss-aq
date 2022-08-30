import { StringFormatter } from '../../../common';

export const tablePrimaryKeyMetadataKey = Symbol.for('table:primaryKey');
export const tablePrimaryKeyColumnNameMetadataKey = Symbol.for('table:primaryKeyColumnName');
export const columnMetadataKey = Symbol.for('table:column');

export type ColumnOptions = {
    name?: string;
    isPrimaryKey?: boolean;
    dtoParser?: (value: any, context: any) => any;
    recordParser?: (value: any, context: any) => any;
};

export function Column(options: ColumnOptions = {}): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        if (!options.name) options.name = StringFormatter.camelToSnakeCase(propertyKey.toString());

        Reflect.defineMetadata(columnMetadataKey, options, target, propertyKey);

        if (options.isPrimaryKey) {
            Reflect.defineMetadata(tablePrimaryKeyMetadataKey, propertyKey, target);
            Reflect.defineMetadata(tablePrimaryKeyColumnNameMetadataKey, options.name, target);
        }
    };
}
