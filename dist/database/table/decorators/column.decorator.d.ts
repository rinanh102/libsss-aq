export declare const tablePrimaryKeyMetadataKey: unique symbol;
export declare const tablePrimaryKeyColumnNameMetadataKey: unique symbol;
export declare const columnMetadataKey: unique symbol;
export declare type ColumnOptions = {
    name?: string;
    isPrimaryKey?: boolean;
    dtoParser?: (value: any, context: any) => any;
    recordParser?: (value: any, context: any) => any;
};
export declare function Column(options?: ColumnOptions): PropertyDecorator;
