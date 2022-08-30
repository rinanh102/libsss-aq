"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttributeMapper = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@heronjs/common");
const common_2 = require("../../common");
const entities_1 = require("../entities");
let EavAttributeMapper = class EavAttributeMapper {
    fromEntityToDTO(entity) {
        return {
            code: entity.code,
            label: entity.label,
            isRequired: entity.isRequired,
            editable: entity.editable,
            visibility: entity.visibility,
            options: entity.options,
            sortOrder: entity.sortOrder,
            systemDefined: entity.systemDefined,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            type: entity.type,
            status: entity.status,
        };
    }
    fromDTOToEntity(dto) {
        return new entities_1.EavAttribute(dto.code, {
            code: dto.code,
            label: dto.label,
            isRequired: dto.isRequired,
            editable: dto.editable,
            visibility: dto.visibility,
            options: dto.options,
            sortOrder: dto.sortOrder,
            systemDefined: dto.systemDefined,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            type: dto.type,
            status: dto.status,
        });
    }
};
EavAttributeMapper = tslib_1.__decorate([
    (0, common_1.Provider)({ token: common_2.EavMapperTokens.ATTRIBUTE, scope: common_1.Scope.SINGLETON })
], EavAttributeMapper);
exports.EavAttributeMapper = EavAttributeMapper;
