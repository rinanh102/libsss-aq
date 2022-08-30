import { EavAttribute, EavAttributeValue } from '../entities';
export declare type EavEntityCreateAttributesValuesInput = {
    value: any;
    attribute: EavAttribute;
}[];
export declare type EavEntityCreateAttributesValuesOutput = EavAttributeValue[];
export declare type EavEntityUpdateAttributesValuesInput = {
    value: any;
    attribute: EavAttribute;
}[];
export declare type EavEntityUpdateAttributesValuesOutput = EavAttributeValue[];
export declare type EavEntityDeleteAttributesValuesInput = {
    attribute: EavAttribute;
}[];
export declare type EavEntityDeleteAttributesValuesOutput = EavAttributeValue[];
export declare type EavEntityChangeAttributesValuesInput = {
    createItems?: EavEntityCreateAttributesValuesInput;
    updateItems?: EavEntityUpdateAttributesValuesInput;
    deleteItems?: EavEntityDeleteAttributesValuesInput;
};
export declare type EavEntityChangeAttributesValuesOutput = {
    createdItems: EavAttributeValue[];
    updatedItems: EavAttributeValue[];
    deletedItems: EavAttributeValue[];
};
