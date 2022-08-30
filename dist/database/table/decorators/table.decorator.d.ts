export declare const tableNameMetadataKey: unique symbol;
export declare const tableEavMetadataKey: unique symbol;
declare type TableOptions = {
    name?: string;
    eav?: {
        tableLink: string;
    };
};
export declare function Table(options: TableOptions): ClassDecorator;
export {};
