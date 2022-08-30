import { BaseTable, TableRelationships } from '.';
export declare type TableProps<T> = {
    [P in keyof T]: TableField<T[P]>;
};
export declare type TableField<T = any> = {
    value: T;
    name: string;
};
export declare type RelationTable = {
    tableName: string;
    relationship: TableRelationships;
    name: string;
    constraintName: string;
    localId: string;
    refId: string;
    children?: RelationTable[];
};
export interface ITables {
    allTables: Map<string, BaseTable>;
}
