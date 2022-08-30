"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotCreateOrUpdateForDisabledAttributeError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class CannotCreateOrUpdateForDisabledAttributeError extends common_1.RuntimeError {
    constructor(message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.CANNOT_CREATE_FOR_DISABLED_ATTRIBUTE, message !== null && message !== void 0 ? message : 'EAV attribute value cannot create or update for disabled attribute');
    }
}
exports.CannotCreateOrUpdateForDisabledAttributeError = CannotCreateOrUpdateForDisabledAttributeError;
