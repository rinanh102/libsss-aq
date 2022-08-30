import { EavAttribute, EavAttributeValue } from '.';
import { Entity } from '../..';
import { EavAttributeCreateInput, EavAttributeUpdateInput, EavEntityChangeAttributesValuesInput, EavEntityChangeAttributesValuesOutput, EavEntityCreateAttributesValuesInput, EavEntityCreateAttributesValuesOutput, EavEntityDeleteAttributesValuesInput, EavEntityDeleteAttributesValuesOutput, EavEntityUpdateAttributesValuesInput, EavEntityUpdateAttributesValuesOutput } from '../types';
export interface IEavEntity {
    attributeValues: EavAttributeValue[];
    createAttribute(input: EavAttributeCreateInput): Promise<EavAttribute>;
    updateAttribute(input: EavAttributeUpdateInput, attribute: EavAttribute): Promise<EavAttribute>;
    deleteAttribute(attribute: EavAttribute): Promise<EavAttribute>;
}
export declare class EavEntity {
    private _entity;
    private _attributeValues;
    constructor(entity: Entity<any>, attributeValues?: EavAttributeValue[]);
    get attributeValues(): EavAttributeValue[];
    private setAttributeValues;
    createAttribute(input: EavAttributeCreateInput): Promise<EavAttribute>;
    updateAttribute(input: EavAttributeUpdateInput, attribute: EavAttribute): Promise<EavAttribute>;
    deleteAttribute(attribute: EavAttribute): Promise<EavAttribute>;
    private _validateAttributeValue;
    createAttributeValues(items: EavEntityCreateAttributesValuesInput): Promise<EavEntityCreateAttributesValuesOutput>;
    updateAttributeValues(items: EavEntityUpdateAttributesValuesInput): Promise<EavEntityUpdateAttributesValuesOutput>;
    deleteAttributeValues(items: EavEntityDeleteAttributesValuesInput): Promise<EavEntityDeleteAttributesValuesOutput>;
    changeAttributeValues(input: EavEntityChangeAttributesValuesInput): Promise<EavEntityChangeAttributesValuesOutput>;
}
