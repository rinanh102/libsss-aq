import { EavAttribute, EavAttributeValue } from '.';
import { Entity } from '../..';
import { EavAttributeStatus, EavAttributeTypes } from '../enums';
import {
    AttributeCannotBeDeletedError,
    AttributeIsRequiredError,
    AttributeValueDoesNotAllowUpdatedError,
    CannotCreateOrUpdateForDisabledAttributeError,
    MustBeABooleanError,
    MustBeADatetimeError,
    MustBeAnArrayError,
    MustBeANumberError,
    MustBeAStringError,
    NotSupportThisTypeError,
    ValueDoesNotMatchOptionError,
} from '../errors';
import {
    EavAttributeCreateInput,
    EavAttributeUpdateInput,
    EavEntityChangeAttributesValuesInput,
    EavEntityChangeAttributesValuesOutput,
    EavEntityCreateAttributesValuesInput,
    EavEntityCreateAttributesValuesOutput,
    EavEntityDeleteAttributesValuesInput,
    EavEntityDeleteAttributesValuesOutput,
    EavEntityUpdateAttributesValuesInput,
    EavEntityUpdateAttributesValuesOutput,
} from '../types';

export interface IEavEntity {
    attributeValues: EavAttributeValue[];

    createAttribute(input: EavAttributeCreateInput): Promise<EavAttribute>;
    updateAttribute(input: EavAttributeUpdateInput, attribute: EavAttribute): Promise<EavAttribute>;
    deleteAttribute(attribute: EavAttribute): Promise<EavAttribute>;
}

export class EavEntity {
    private _entity: Entity<any>;
    private _attributeValues: EavAttributeValue[];

    constructor(entity: Entity<any>, attributeValues?: EavAttributeValue[]) {
        this._entity = entity;
        if (attributeValues) this._attributeValues = attributeValues;
        else this._attributeValues = [];
    }

    get attributeValues(): EavAttributeValue[] {
        return this._attributeValues;
    }

    private setAttributeValues(attributeValues?: EavAttributeValue[]): void {
        if (attributeValues !== undefined) this._attributeValues = attributeValues;
    }

    public async createAttribute(input: EavAttributeCreateInput): Promise<EavAttribute> {
        const attribute = new EavAttribute();
        await attribute.create(input);
        return attribute;
    }

    public async updateAttribute(
        input: EavAttributeUpdateInput,
        attribute: EavAttribute,
    ): Promise<EavAttribute> {
        await attribute.update(input);
        return attribute;
    }

    public async deleteAttribute(attribute: EavAttribute): Promise<EavAttribute> {
        await attribute.delete();
        return attribute;
    }

    private _validateAttributeValue(attribute: EavAttribute, value: any) {
        if (attribute.isRequired && (value === undefined || value === null || value === ''))
            throw new AttributeIsRequiredError(attribute.code);

        if (value !== undefined) {
            if (attribute.status !== EavAttributeStatus.ENABLED)
                throw new CannotCreateOrUpdateForDisabledAttributeError();

            if (Array.isArray(attribute.options) && attribute.options.length)
                if (!attribute.options.find((o) => o == value)) throw new ValueDoesNotMatchOptionError();

            switch (attribute.type) {
                case EavAttributeTypes.NUMBER:
                    if (typeof value !== 'number')
                        throw new MustBeANumberError(
                            `Value of attribute "${attribute.code}" must be a number`,
                        );
                    break;
                case EavAttributeTypes.STRING:
                    if (typeof value !== 'string')
                        throw new MustBeAStringError(
                            `Value of attribute "${attribute.code}" must be a string`,
                        );
                    break;
                case EavAttributeTypes.BOOLEAN:
                    if (typeof value !== 'boolean')
                        throw new MustBeABooleanError(
                            `Value of attribute "${attribute.code}" must be a boolean`,
                        );
                    break;
                case EavAttributeTypes.DATETIME:
                    value = new Date(value);
                    if (isNaN(value))
                        throw new MustBeADatetimeError(
                            `Value of attribute "${attribute.code}" must be a datetime`,
                        );
                    break;
                case EavAttributeTypes.ARRAY:
                    if (!Array.isArray(value))
                        throw new MustBeAnArrayError(
                            `Value of attribute "${attribute.code}" must be a array`,
                        );
                    break;
                case EavAttributeTypes.OBJECT:
                    if (value === null || typeof value !== 'object')
                        throw new MustBeAnArrayError(
                            `Value of attribute "${attribute.code}" must be a object`,
                        );
                    break;
                default:
                    throw new NotSupportThisTypeError();
            }
        }
    }

    public async createAttributeValues(
        items: EavEntityCreateAttributesValuesInput,
    ): Promise<EavEntityCreateAttributesValuesOutput> {
        const attributeValues: EavAttributeValue[] = [];
        for (const item of items) {
            if (this.attributeValues.find((a) => a.attributeCode === item.attribute.code)) continue;

            this._validateAttributeValue(item.attribute, item.value);

            const attributeValue = new EavAttributeValue();
            await attributeValue.create({
                ...item,
                entityId: this._entity.id,
                code: item.attribute.code,
            });

            if (attributeValue.value !== undefined) attributeValues.push(attributeValue);
        }

        this.setAttributeValues([...this.attributeValues, ...attributeValues]);

        return attributeValues;
    }

    public async updateAttributeValues(
        items: EavEntityUpdateAttributesValuesInput,
    ): Promise<EavEntityUpdateAttributesValuesOutput> {
        const attributeValuesUpdated: EavAttributeValue[] = [];

        items.forEach((item) => {
            this._validateAttributeValue(item.attribute, item.value);
            if (!item.attribute.editable) throw new AttributeValueDoesNotAllowUpdatedError();

            const attributeValue = this.attributeValues.find((a) => a.attributeCode === item.attribute.code);
            if (attributeValue) {
                attributeValue.update(item);
                attributeValuesUpdated.push(attributeValue);
            }
        });

        return attributeValuesUpdated;
    }

    public async deleteAttributeValues(
        items: EavEntityDeleteAttributesValuesInput,
    ): Promise<EavEntityDeleteAttributesValuesOutput> {
        const attributeValuesDeleted: EavAttributeValue[] = [];

        items.forEach((item) => {
            if (item.attribute.systemDefined === true) throw new AttributeCannotBeDeletedError();

            const attributeValue = this.attributeValues.find((a) => a.attributeCode === item.attribute.code);
            if (attributeValue) {
                attributeValue.delete();
                attributeValuesDeleted.push(attributeValue);
            }
        });

        this.setAttributeValues(this.attributeValues.filter((a) => !attributeValuesDeleted.includes(a)));

        return attributeValuesDeleted;
    }

    public async changeAttributeValues(
        input: EavEntityChangeAttributesValuesInput,
    ): Promise<EavEntityChangeAttributesValuesOutput> {
        const deletedItems = input.deleteItems ? await this.deleteAttributeValues(input.deleteItems) : [];
        const updatedItems = input.updateItems ? await this.updateAttributeValues(input.updateItems) : [];
        const createdItems = input.createItems ? await this.createAttributeValues(input.createItems) : [];

        return { deletedItems, updatedItems, createdItems };
    }
}
