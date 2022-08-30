"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttribute = void 0;
const tslib_1 = require("tslib");
const __1 = require("../..");
const domain_1 = require("../../domain");
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const types_1 = require("../types");
class EavAttribute extends domain_1.Entity {
    constructor(id, props) {
        super(id, props);
    }
    get code() {
        return this._props.code;
    }
    get label() {
        return this._props.label;
    }
    get type() {
        return this._props.type;
    }
    get isRequired() {
        return this._props.isRequired;
    }
    get editable() {
        return this._props.editable;
    }
    get visibility() {
        return this._props.visibility;
    }
    get options() {
        return this._props.options;
    }
    get sortOrder() {
        return this._props.sortOrder;
    }
    get systemDefined() {
        return this._props.systemDefined;
    }
    get status() {
        return this._props.status;
    }
    get createdAt() {
        return this._props.createdAt;
    }
    get updatedAt() {
        return this._props.updatedAt;
    }
    setCode(code) {
        if (code !== undefined)
            this._props.code = code;
    }
    setLabel(label) {
        if (label !== undefined)
            this._props.label = label;
    }
    setType(type) {
        if (type !== undefined)
            this._props.type = type;
    }
    setIsRequired(isRequired) {
        if (isRequired !== undefined)
            this._props.isRequired = isRequired;
    }
    setEditable(editable) {
        if (editable !== undefined)
            this._props.editable = editable;
    }
    setVisibility(visibility) {
        if (visibility !== undefined)
            this._props.visibility = visibility;
    }
    setOptions(options) {
        if (options !== undefined) {
            options.forEach((value) => {
                switch (this.type) {
                    case enums_1.EavAttributeTypes.NUMBER:
                        if (typeof value !== 'number')
                            throw new errors_1.MustBeANumberError();
                        break;
                    case enums_1.EavAttributeTypes.STRING:
                        if (typeof value !== 'string')
                            throw new errors_1.MustBeAStringError();
                        break;
                    case enums_1.EavAttributeTypes.BOOLEAN:
                        if (typeof value !== 'boolean')
                            throw new errors_1.MustBeABooleanError();
                        break;
                    case enums_1.EavAttributeTypes.DATETIME:
                        value = new Date(value);
                        if (isNaN(value))
                            throw new errors_1.MustBeADatetimeError();
                        break;
                    case enums_1.EavAttributeTypes.ARRAY:
                        if (!Array.isArray(value))
                            throw new errors_1.MustBeAnArrayError();
                        break;
                    case enums_1.EavAttributeTypes.OBJECT:
                        if (value === null || typeof value !== 'object')
                            throw new errors_1.MustBeAnArrayError();
                        break;
                }
            });
            this._props.options = options;
        }
    }
    setSortOrder(sortOrder) {
        if (sortOrder !== undefined)
            this._props.sortOrder = sortOrder;
    }
    setSystemDefined(systemDefined) {
        if (systemDefined !== undefined)
            this._props.systemDefined = systemDefined;
    }
    setStatus(status) {
        if (status !== undefined)
            this._props.status = status;
    }
    setCreatedAt(createdAt) {
        if (createdAt !== undefined)
            this._props.createdAt = createdAt;
    }
    setUpdatedAt(updatedAt) {
        if (updatedAt !== undefined)
            this._props.updatedAt = updatedAt;
    }
    create(payload) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield __1.ValidatorUtil.validatePlain(types_1.EavAttributeCreateInputModel, payload);
            this.setId(model.code);
            this.setCode(model.code);
            this.setLabel(model.label);
            this.setType(model.type);
            this.setIsRequired((_a = model.isRequired) !== null && _a !== void 0 ? _a : false);
            this.setEditable(true);
            this.setSystemDefined(false);
            this.setVisibility(model.visibility === undefined ? true : model.visibility);
            this.setOptions(model.options);
            this.setSortOrder((_b = model.sortOrder) !== null && _b !== void 0 ? _b : 0);
            this.setStatus((_c = model.status) !== null && _c !== void 0 ? _c : enums_1.EavAttributeStatus.ENABLED);
            this.setCreatedAt(new Date());
        });
    }
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield __1.ValidatorUtil.validatePlain(types_1.EavAttributeUpdateInputModel, payload);
            this.setLabel(model.label);
            this.setIsRequired(model.isRequired);
            this.setVisibility(model.visibility);
            this.setOptions(model.options);
            this.setSortOrder(model.sortOrder);
            this.setStatus(model.status);
            this.setUpdatedAt(new Date());
        });
    }
    delete() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.systemDefined === true)
                throw new errors_1.AttributeCannotBeDeletedError();
        });
    }
}
exports.EavAttribute = EavAttribute;
