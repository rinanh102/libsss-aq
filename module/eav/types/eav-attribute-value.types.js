"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeValuesInputModel = exports.CreateAttributeValuesInputModel = exports.EavAttributeValueUpdateInputModel = exports.EavAttributeValueCreateInputModel = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class EavAttributeValueCreateInputModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueCreateInputModel.prototype, "value", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueCreateInputModel.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueCreateInputModel.prototype, "entityId", void 0);
exports.EavAttributeValueCreateInputModel = EavAttributeValueCreateInputModel;
class EavAttributeValueUpdateInputModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueUpdateInputModel.prototype, "value", void 0);
exports.EavAttributeValueUpdateInputModel = EavAttributeValueUpdateInputModel;
class CreateAttributeValuesInputModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateAttributeValuesInputModel.prototype, "value", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAttributeValuesInputModel.prototype, "code", void 0);
exports.CreateAttributeValuesInputModel = CreateAttributeValuesInputModel;
class ItemAttributeValueModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], ItemAttributeValueModel.prototype, "value", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ItemAttributeValueModel.prototype, "code", void 0);
class UpdateAttributeValuesInputModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemAttributeValueModel),
    tslib_1.__metadata("design:type", Array)
], UpdateAttributeValuesInputModel.prototype, "deleteItems", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemAttributeValueModel),
    tslib_1.__metadata("design:type", Array)
], UpdateAttributeValuesInputModel.prototype, "updateItems", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemAttributeValueModel),
    tslib_1.__metadata("design:type", Array)
], UpdateAttributeValuesInputModel.prototype, "createItems", void 0);
exports.UpdateAttributeValuesInputModel = UpdateAttributeValuesInputModel;
