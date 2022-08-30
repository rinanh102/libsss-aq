import { relationMetadataKey, TableRelationships } from '..';
import { StringFormatter } from '../../../common';

export function HasMany(tableName: string, localId: string, refId: string): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(
            relationMetadataKey,
            {
                name: StringFormatter.camelToSnakeCase(propertyKey.toString()),
                tableName,
                localId,
                refId,
                relationship: TableRelationships.ONE_TO_MANY,
            },
            target,
            propertyKey,
        );
    };
}
