"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorUtil = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@heronjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ValidatorUtil {
    static validateOrReject(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, class_validator_1.validateOrReject)(input);
            }
            catch (errors) {
                throw new common_1.RuntimeError(common_1.Errors.VALIDATION_ERR, 10000, 'Validate failed', errors);
            }
        });
    }
    static validatePlain(classModel, plain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const model = (0, class_transformer_1.plainToClass)(classModel, plain);
                yield (0, class_validator_1.validateOrReject)(model);
                return (0, class_transformer_1.instanceToPlain)(model);
            }
            catch (errors) {
                console.log(errors);
                throw new common_1.RuntimeError(common_1.Errors.VALIDATION_ERR, 10000, 'Validate failed', errors);
            }
        });
    }
}
exports.ValidatorUtil = ValidatorUtil;
