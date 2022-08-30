"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavUtil = exports.EavEntityRepo = void 0;
const tslib_1 = require("tslib");
const entities_1 = require("./entities");
const errors_1 = require("./errors");
class EavEntityRepo {
    constructor(_eavAttributeMapper, _eavAttributeDAO) {
        this._eavAttributeMapper = _eavAttributeMapper;
        this._eavAttributeDAO = _eavAttributeDAO;
    }
    createAttribute(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = new entities_1.EavAttribute();
            yield attribute.create(input);
            yield this._eavAttributeDAO.create(attribute);
            return attribute;
        });
    }
    updateAttribute(code, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.getAttributeByCode(code);
            if (!attribute)
                throw new errors_1.AttributeNotFoundError(code);
            yield attribute.update(input);
            yield this._eavAttributeDAO.updateById(attribute.id, attribute);
            return attribute;
        });
    }
    deleteAttribute(code) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.getAttributeByCode(code);
            if (!attribute)
                throw new errors_1.AttributeNotFoundError(code);
            yield attribute.delete();
            yield this._eavAttributeDAO.deleteById(attribute.id);
            return attribute;
        });
    }
    getAttributeByCode(code) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dto = (yield this._eavAttributeDAO.findOne({
                filter: {
                    code: { eq: code },
                },
            }));
            return dto ? this._eavAttributeMapper.fromDTOToEntity(dto) : dto;
        });
    }
}
exports.EavEntityRepo = EavEntityRepo;
class EavUtil {
    static getCreateAttributeValuesInput(input, eavAttributeMapper, eavAttributeDAO) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const codes = Array.from(new Set(input.map((a) => a.code)));
            const attributes = (yield eavAttributeDAO.find({
                filter: {
                    code: { in: codes },
                },
            })).map((a) => eavAttributeMapper.fromDTOToEntity(a));
            const attributesMap = new Map();
            attributes.forEach((a) => {
                if (!attributesMap.get(a.code))
                    attributesMap.set(a.code, a);
            });
            const attributeValuesInput = input.reduce((a, b) => {
                const attribute = attributesMap.get(b.code);
                if (attribute)
                    a.push({
                        value: b.value,
                        attribute,
                    });
                return a;
            }, []);
            return attributeValuesInput;
        });
    }
    static getUpdateAttributeValuesInput(input, eavAttributeMapper, eavAttributeDAO) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const codes = Array.from(new Set([
                ...(input.deleteItems ? input.deleteItems.map((a) => a.code) : []),
                ...(input.updateItems ? input.updateItems.map((a) => a.code) : []),
                ...(input.createItems ? input.createItems.map((a) => a.code) : []),
            ]));
            const attributes = (yield eavAttributeDAO.find({
                filter: {
                    code: { in: codes },
                },
            })).map((a) => eavAttributeMapper.fromDTOToEntity(a));
            const attributesMap = new Map();
            attributes.forEach((a) => {
                if (!attributesMap.get(a.code))
                    attributesMap.set(a.code, a);
            });
            const deleteItems = (_a = input.deleteItems) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => {
                const attribute = attributesMap.get(b.code);
                if (attribute)
                    a.push({
                        attribute,
                    });
                return a;
            }, []);
            const updateItems = (_b = input.updateItems) === null || _b === void 0 ? void 0 : _b.reduce((a, b) => {
                const attribute = attributesMap.get(b.code);
                if (attribute)
                    a.push({
                        value: b.value,
                        attribute,
                    });
                return a;
            }, []);
            const createItems = (_c = input.createItems) === null || _c === void 0 ? void 0 : _c.reduce((a, b) => {
                const attribute = attributesMap.get(b.code);
                if (attribute)
                    a.push({
                        value: b.value,
                        attribute,
                    });
                return a;
            }, []);
            return { deleteItems, updateItems, createItems };
        });
    }
}
exports.EavUtil = EavUtil;
tslib_1.__exportStar(require("./entities"), exports);
tslib_1.__exportStar(require("./enums"), exports);
tslib_1.__exportStar(require("./errors"), exports);
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./dtos"), exports);
tslib_1.__exportStar(require("./tables"), exports);
tslib_1.__exportStar(require("./mappers"), exports);
tslib_1.__exportStar(require("./usecases"), exports);
