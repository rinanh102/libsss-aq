"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttributeValueMapper = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@heronjs/common");
const common_2 = require("../../common");
const entities_1 = require("../entities");
let EavAttributeValueMapper = class EavAttributeValueMapper {
    fromEntityToDTO(entity) {
        return {
            id: entity.id,
            value: entity.value,
            entityId: entity.entityId,
            attributeCode: entity.attributeCode,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    fromDTOToEntity(dto) {
        return new entities_1.EavAttributeValue(dto.id, {
            id: dto.id,
            value: dto.value,
            entityId: dto.entityId,
            attributeCode: dto.attributeCode,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        });
    }
};
EavAttributeValueMapper = tslib_1.__decorate([
    (0, common_1.Provider)({ token: common_2.EavMapperTokens.ATTRIBUTE_VALUE, scope: common_1.Scope.SINGLETON })
], EavAttributeValueMapper);
exports.EavAttributeValueMapper = EavAttributeValueMapper;
