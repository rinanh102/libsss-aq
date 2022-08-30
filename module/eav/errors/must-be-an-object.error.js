"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeAnObjectError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class MustBeAnObjectError extends common_1.RuntimeError {
    constructor(message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.TYPE_OF_VALUE_MUST_BE_A_OBJECT, message !== null && message !== void 0 ? message : 'EAV attribute value must be a object');
    }
}
exports.MustBeAnObjectError = MustBeAnObjectError;
