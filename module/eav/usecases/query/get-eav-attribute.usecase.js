"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEavAttributeUseCase = void 0;
const tslib_1 = require("tslib");
const __1 = require("../../..");
const usecase_1 = require("../../../usecase");
class GetEavAttributeUseCase extends usecase_1.UseCase {
    constructor(_eavAttributeDAO) {
        super();
        this._eavAttributeDAO = _eavAttributeDAO;
        this.validate = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return input;
        });
        this.processing = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const todoDTO = yield this._eavAttributeDAO.findOne({ filter: { code: { eq: input } } });
            if (!todoDTO)
                throw new __1.AttributeNotFoundError(input);
            return todoDTO;
        });
        this.map = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return input;
        });
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }
}
exports.GetEavAttributeUseCase = GetEavAttributeUseCase;
