export const eavEntityMetadataKey = Symbol.for('table:eavEntity');
export const eavAttributeMetadataKey = Symbol.for('table:eavAttribute');
export const eavValueMetadataKey = Symbol.for('table:eavValue');

export type EavOptions = {
    type: EavTableTypes;
};

export enum EavTableTypes {
    ENTITY,
    ATTRIBUTE,
    VALUE,
}

export function Eav(options: EavOptions): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        switch (options.type) {
            case EavTableTypes.ENTITY:
                Reflect.defineMetadata(eavEntityMetadataKey, propertyKey, target);
                break;

            case EavTableTypes.ATTRIBUTE:
                Reflect.defineMetadata(eavAttributeMetadataKey, propertyKey, target);
                break;

            case EavTableTypes.VALUE:
                Reflect.defineMetadata(eavValueMetadataKey, propertyKey, target);
                break;

            default:
                break;
        }
    };
}
