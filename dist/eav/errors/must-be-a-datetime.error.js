"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeADatetimeError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class MustBeADatetimeError extends common_1.RuntimeError {
    constructor(message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.TYPE_OF_VALUE_MUST_BE_A_DATETIME, message !== null && message !== void 0 ? message : 'EAV attribute value must be a datetime');
    }
}
exports.MustBeADatetimeError = MustBeADatetimeError;
