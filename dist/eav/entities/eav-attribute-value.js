"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttributeValue = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../../common");
const domain_1 = require("../../domain");
const validator_1 = require("../../validator");
const types_1 = require("../types");
class EavAttributeValue extends domain_1.Entity {
    constructor(id, props) {
        super(id, props);
    }
    get value() {
        return this._props.value;
    }
    get entityId() {
        return this._props.entityId;
    }
    get attributeCode() {
        return this._props.attributeCode;
    }
    get createdAt() {
        return this._props.createdAt;
    }
    get updatedAt() {
        return this._props.updatedAt;
    }
    setValue(value) {
        if (value !== undefined)
            this._props.value = value;
    }
    setEntityId(entityId) {
        if (entityId !== undefined)
            this._props.entityId = entityId;
    }
    setAttributeCode(attributeCode) {
        if (attributeCode !== undefined)
            this._props.attributeCode = attributeCode;
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield validator_1.ValidatorUtil.validatePlain(types_1.EavAttributeValueCreateInputModel, payload);
            this.setId(common_1.EntityIdUtil.randomUUID());
            this.setEntityId(model.entityId);
            this.setAttributeCode(model.code);
            this.setValue(model.value);
            this.setCreatedAt(new Date());
        });
    }
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const model = yield validator_1.ValidatorUtil.validatePlain(types_1.EavAttributeValueUpdateInputModel, payload);
            this.setValue(model.value);
            this.setUpdatedAt(new Date());
        });
    }
    delete() {
        return;
    }
}
exports.EavAttributeValue = EavAttributeValue;
