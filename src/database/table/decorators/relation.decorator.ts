import { TableRelationships } from '..';
import { StringFormatter } from '../../../common';

export const relationMetadataKey = Symbol.for('table:relation');

export type RelationOptions = {
    name?: string;
    tableName: string;
    localId: string;
    refId?: string;
    relationship?: TableRelationships;
};

export function Relation(options: RelationOptions): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        if (options) {
            if (!options.name) options.name = StringFormatter.camelToSnakeCase(propertyKey.toString());

            if (!options.localId) {
                options.localId = 'id';
            }

            if (!options.refId) {
                options.refId = 'id';
            }

            if (!options.relationship) {
                options.relationship = TableRelationships.ONE_TO_ONE;
            }
        }

        Reflect.defineMetadata(relationMetadataKey, options, target, propertyKey);
    };
}
