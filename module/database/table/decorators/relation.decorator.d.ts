import { TableRelationships } from '..';
export declare const relationMetadataKey: unique symbol;
export declare type RelationOptions = {
    name?: string;
    tableName: string;
    localId: string;
    refId?: string;
    relationship?: TableRelationships;
};
export declare function Relation(options: RelationOptions): PropertyDecorator;
