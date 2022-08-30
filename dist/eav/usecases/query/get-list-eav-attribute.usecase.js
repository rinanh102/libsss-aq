"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListEavAttributeUseCase = void 0;
const tslib_1 = require("tslib");
const usecase_1 = require("../../../usecase");
class GetListEavAttributeUseCase extends usecase_1.UseCase {
    constructor(_eavAttributeDAO) {
        super();
        this._eavAttributeDAO = _eavAttributeDAO;
        this.validate = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return input;
        });
        this.processing = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._eavAttributeDAO.find(input);
        });
        this.map = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return input;
        });
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }
}
exports.GetListEavAttributeUseCase = GetListEavAttributeUseCase;
