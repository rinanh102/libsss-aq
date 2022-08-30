"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttributeTable = void 0;
const tslib_1 = require("tslib");
const __1 = require("../..");
const enums_1 = require("../enums");
class EavAttributeTable extends __1.BaseTable {
    constructor() {
        super(...arguments);
        this.code = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.label = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.type = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.status = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.sortOrder = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.visibility = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.systemDefined = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.isRequired = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.editable = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.options = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.createdAt = __1.TABLE_FIELD_DEFAULT_VALUE;
        this.updatedAt = __1.TABLE_FIELD_DEFAULT_VALUE;
    }
}
tslib_1.__decorate([
    (0, __1.Column)({ isPrimaryKey: true }),
    tslib_1.__metadata("design:type", String)
], EavAttributeTable.prototype, "code", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeTable.prototype, "label", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeTable.prototype, "type", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", String)
], EavAttributeTable.prototype, "status", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Number)
], EavAttributeTable.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], EavAttributeTable.prototype, "visibility", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], EavAttributeTable.prototype, "systemDefined", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], EavAttributeTable.prototype, "isRequired", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], EavAttributeTable.prototype, "editable", void 0);
tslib_1.__decorate([
    (0, __1.Column)({
        recordParser: (value) => {
            if (Array.isArray(value))
                return JSON.stringify(value);
            return value;
        },
        dtoParser: (value) => {
            try {
                return JSON.parse(value);
            }
            catch (error) {
                return null;
            }
        },
    }),
    tslib_1.__metadata("design:type", Array)
], EavAttributeTable.prototype, "options", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Date)
], EavAttributeTable.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, __1.Column)(),
    tslib_1.__metadata("design:type", Date)
], EavAttributeTable.prototype, "updatedAt", void 0);
exports.EavAttributeTable = EavAttributeTable;
