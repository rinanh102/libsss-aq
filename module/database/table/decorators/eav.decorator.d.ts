export declare const eavEntityMetadataKey: unique symbol;
export declare const eavAttributeMetadataKey: unique symbol;
export declare const eavValueMetadataKey: unique symbol;
export declare type EavOptions = {
    type: EavTableTypes;
};
export declare enum EavTableTypes {
    ENTITY = 0,
    ATTRIBUTE = 1,
    VALUE = 2
}
export declare function Eav(options: EavOptions): PropertyDecorator;
