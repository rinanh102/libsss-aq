"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeIsRequiredError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class AttributeIsRequiredError extends common_1.RuntimeError {
    constructor(attributeCode, message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.ATTRIBUTE_IS_REQUIRED, message !== null && message !== void 0 ? message : `EAV attribute ${attributeCode} is required`);
    }
}
exports.AttributeIsRequiredError = AttributeIsRequiredError;
