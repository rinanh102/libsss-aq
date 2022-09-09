import { relationMetadataKey, TableRelationships } from '..';
import { StringFormatter } from '../../../common';

export function HasMany(
    tableName: string,
    localId: string,
    refId: string,
    options?: {
        notUseJoinStatement?: boolean;
    },
): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(
            relationMetadataKey,
            {
                name: StringFormatter.camelToSnakeCase(propertyKey.toString()),
                tableName,
                localId,
                refId,
                relationship: TableRelationships.ONE_TO_MANY,
                options,
            },
            target,
            propertyKey,
        );
    };
}
