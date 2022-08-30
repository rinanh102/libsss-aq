"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEavAttributeUseCaseInputModel = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class UpdateEavAttributeUseCaseInputModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateEavAttributeUseCaseInputModel.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    tslib_1.__metadata("design:type", String)
], UpdateEavAttributeUseCaseInputModel.prototype, "label", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EavAttributeStatus),
    tslib_1.__metadata("design:type", String)
], UpdateEavAttributeUseCaseInputModel.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateEavAttributeUseCaseInputModel.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateEavAttributeUseCaseInputModel.prototype, "visibility", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateEavAttributeUseCaseInputModel.prototype, "isRequired", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateEavAttributeUseCaseInputModel.prototype, "options", void 0);
exports.UpdateEavAttributeUseCaseInputModel = UpdateEavAttributeUseCaseInputModel;
