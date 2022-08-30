"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeCannotBeDeletedError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class AttributeCannotBeDeletedError extends common_1.RuntimeError {
    constructor(message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.SYSTEM_DEFINED_ATTRIBUTE_CANNOT_BE_DELETED, message !== null && message !== void 0 ? message : 'EAV system defined attribute cannot be deleted');
    }
}
exports.AttributeCannotBeDeletedError = AttributeCannotBeDeletedError;
