"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportThisTypeError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class NotSupportThisTypeError extends common_1.RuntimeError {
    constructor(message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.NOT_SUPPORT_THIS_TYPE, message !== null && message !== void 0 ? message : 'EAV attribute value not support this type');
    }
}
exports.NotSupportThisTypeError = NotSupportThisTypeError;
