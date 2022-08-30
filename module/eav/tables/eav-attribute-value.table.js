"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttributeValueTable = void 0;
const tslib_1 = require("tslib");
const __1 = require("../..");
class EavAttributeValueTable extends __1.BaseTable {
    constructor() {
        super(...arguments);
        this.id = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.value = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.entityId = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.attributeCode = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.createdAt = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.updatedAt = __1.TABLE_FIELD_DEFAULT_VALUE;
    }
}
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueTable.prototype, "id", void 0);
tslib_1.__decorate([
    (0, __1.Column)({
        recordParser: (value) => {
            if (Array.isArray(value))
                return JSON.stringify(value);
            return value;
        },
        dtoParser: (value, context) => {
            if (context.attribute && context.attribute.length) {
                const type = context.attribute[0].type;
                switch (type) {
                    case __1.EavAttributeTypes.STRING:
                        return value;
                    case __1.EavAttributeTypes.NUMBER:
                        return Number(value);
                    case __1.EavAttributeTypes.BOOLEAN:
                        return JSON.parse(value);
                    case __1.EavAttributeTypes.ARRAY:
                        return JSON.parse(value);
                    case __1.EavAttributeTypes.OBJECT:
                        return JSON.parse(value);
                    case __1.EavAttributeTypes.DATETIME:
                        return new Date(value);
                    default:
                        return value;
                }
            }
        },
    }),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueTable.prototype, "value", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    (0, __1.Eav)({ type: __1.EavTableTypes.ENTITY }),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueTable.prototype, "entityId", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    (0, __1.Eav)({ type: __1.EavTableTypes.ATTRIBUTE }),
    tslib_1.__metadata("design:type", String)
], EavAttributeValueTable.prototype, "attributeCode", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Date)
], EavAttributeValueTable.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Date)
], EavAttributeValueTable.prototype, "updatedAt", void 0);
exports.EavAttributeValueTable = EavAttributeValueTable;
