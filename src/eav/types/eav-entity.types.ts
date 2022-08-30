import { EavAttribute, EavAttributeValue } from '../entities';

export type EavEntityCreateAttributesValuesInput = {
    value: any;
    attribute: EavAttribute;
}[];
export type EavEntityCreateAttributesValuesOutput = EavAttributeValue[];

export type EavEntityUpdateAttributesValuesInput = {
    value: any;
    attribute: EavAttribute;
}[];
export type EavEntityUpdateAttributesValuesOutput = EavAttributeValue[];

export type EavEntityDeleteAttributesValuesInput = {
    attribute: EavAttribute;
}[];
export type EavEntityDeleteAttributesValuesOutput = EavAttributeValue[];

export type EavEntityChangeAttributesValuesInput = {
    createItems?: EavEntityCreateAttributesValuesInput;
    updateItems?: EavEntityUpdateAttributesValuesInput;
    deleteItems?: EavEntityDeleteAttributesValuesInput;
};
export type EavEntityChangeAttributesValuesOutput = {
    createdItems: EavAttributeValue[];
    updatedItems: EavAttributeValue[];
    deletedItems: EavAttributeValue[];
};
