"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEavAttributeUseCase = void 0;
const tslib_1 = require("tslib");
const usecase_1 = require("../../../usecase");
const validator_1 = require("../../../validator");
const types_1 = require("./types");
class DeleteEavAttributeUseCase extends usecase_1.UseCase {
    constructor(_mapper, _repo) {
        super();
        this._mapper = _mapper;
        this._repo = _repo;
        this.validate = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return validator_1.ValidatorUtil.validatePlain(types_1.DeleteEavAttributeUseCaseInputModel, input);
        });
        this.processing = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const entity = yield this._repo.deleteAttribute(input.code);
            return { entity };
        });
        this.map = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return;
        });
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }
}
exports.DeleteEavAttributeUseCase = DeleteEavAttributeUseCase;
