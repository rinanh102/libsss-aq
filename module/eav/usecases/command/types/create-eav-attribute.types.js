"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEavAttributeUseCaseInputModel = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class CreateEavAttributeUseCaseInputModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(32),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/),
    tslib_1.__metadata("design:type", String)
], CreateEavAttributeUseCaseInputModel.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    tslib_1.__metadata("design:type", String)
], CreateEavAttributeUseCaseInputModel.prototype, "label", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.EavAttributeTypes),
    tslib_1.__metadata("design:type", String)
], CreateEavAttributeUseCaseInputModel.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EavAttributeStatus),
    tslib_1.__metadata("design:type", String)
], CreateEavAttributeUseCaseInputModel.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateEavAttributeUseCaseInputModel.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateEavAttributeUseCaseInputModel.prototype, "visibility", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateEavAttributeUseCaseInputModel.prototype, "isRequired", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateEavAttributeUseCaseInputModel.prototype, "options", void 0);
exports.CreateEavAttributeUseCaseInputModel = CreateEavAttributeUseCaseInputModel;
