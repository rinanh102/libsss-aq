"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavEntity = void 0;
const tslib_1 = require("tslib");
const _1 = require(".");
const enums_1 = require("../enums");
const errors_1 = require("../errors");
class EavEntity {
    constructor(entity, attributeValues) {
        this._entity = entity;
        if (attributeValues)
            this._attributeValues = attributeValues;
        else
            this._attributeValues = [];
    }
    get attributeValues() {
        return this._attributeValues;
    }
    setAttributeValues(attributeValues) {
        if (attributeValues !== undefined)
            this._attributeValues = attributeValues;
    }
    createAttribute(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = new _1.EavAttribute();
            yield attribute.create(input);
            return attribute;
        });
    }
    updateAttribute(input, attribute) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield attribute.update(input);
            return attribute;
        });
    }
    deleteAttribute(attribute) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield attribute.delete();
            return attribute;
        });
    }
    _validateAttributeValue(attribute, value) {
        if (attribute.isRequired && (value === undefined || value === null || value === ''))
            throw new errors_1.AttributeIsRequiredError(attribute.code);
        if (value !== undefined) {
            if (attribute.status !== enums_1.EavAttributeStatus.ENABLED)
                throw new errors_1.CannotCreateOrUpdateForDisabledAttributeError();
            if (Array.isArray(attribute.options) && attribute.options.length)
                if (!attribute.options.find((o) => o == value))
                    throw new errors_1.ValueDoesNotMatchOptionError();
            switch (attribute.type) {
                case enums_1.EavAttributeTypes.NUMBER:
                    if (typeof value !== 'number')
                        throw new errors_1.MustBeANumberError(`Value of attribute "${attribute.code}" must be a number`);
                    break;
                case enums_1.EavAttributeTypes.STRING:
                    if (typeof value !== 'string')
                        throw new errors_1.MustBeAStringError(`Value of attribute "${attribute.code}" must be a string`);
                    break;
                case enums_1.EavAttributeTypes.BOOLEAN:
                    if (typeof value !== 'boolean')
                        throw new errors_1.MustBeABooleanError(`Value of attribute "${attribute.code}" must be a boolean`);
                    break;
                case enums_1.EavAttributeTypes.DATETIME:
                    value = new Date(value);
                    if (isNaN(value))
                        throw new errors_1.MustBeADatetimeError(`Value of attribute "${attribute.code}" must be a datetime`);
                    break;
                case enums_1.EavAttributeTypes.ARRAY:
                    if (!Array.isArray(value))
                        throw new errors_1.MustBeAnArrayError(`Value of attribute "${attribute.code}" must be a array`);
                    break;
                case enums_1.EavAttributeTypes.OBJECT:
                    if (value === null || typeof value !== 'object')
                        throw new errors_1.MustBeAnArrayError(`Value of attribute "${attribute.code}" must be a object`);
                    break;
                default:
                    throw new errors_1.NotSupportThisTypeError();
            }
        }
    }
    createAttributeValues(items) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeValues = [];
            for (const item of items) {
                this._validateAttributeValue(item.attribute, item.value);
                const attributeValue = new _1.EavAttributeValue();
                yield attributeValue.create(Object.assign(Object.assign({}, item), { entityId: this._entity.id, code: item.attribute.code }));
                if (attributeValue.value !== undefined)
                    attributeValues.push(attributeValue);
            }
            this.setAttributeValues([...this.attributeValues, ...attributeValues]);
            return attributeValues;
        });
    }
    updateAttributeValues(items) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeValuesUpdated = [];
            items.forEach((item) => {
                this._validateAttributeValue(item.attribute, item.value);
                if (!item.attribute.editable)
                    throw new errors_1.AttributeValueDoesNotAllowUpdatedError();
                const attributeValue = this.attributeValues.find((a) => a.attributeCode === item.attribute.code);
                if (attributeValue) {
                    attributeValue.update(item);
                    attributeValuesUpdated.push(attributeValue);
                }
            });
            return attributeValuesUpdated;
        });
    }
    deleteAttributeValues(items) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeValuesDeleted = [];
            items.forEach((item) => {
                if (item.attribute.systemDefined === true)
                    throw new errors_1.AttributeCannotBeDeletedError();
                const attributeValue = this.attributeValues.find((a) => a.attributeCode === item.attribute.code);
                if (attributeValue) {
                    attributeValue.delete();
                    attributeValuesDeleted.push(attributeValue);
                }
            });
            this.setAttributeValues(this.attributeValues.filter((a) => !attributeValuesDeleted.includes(a)));
            return attributeValuesDeleted;
        });
    }
    changeAttributeValues(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedItems = input.deleteItems ? yield this.deleteAttributeValues(input.deleteItems) : [];
            const updatedItems = input.updateItems ? yield this.updateAttributeValues(input.updateItems) : [];
            const createdItems = input.createItems ? yield this.createAttributeValues(input.createItems) : [];
            return { deletedItems, updatedItems, createdItems };
        });
    }
}
exports.EavEntity = EavEntity;
