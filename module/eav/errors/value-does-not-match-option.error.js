"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueDoesNotMatchOptionError = void 0;
const common_1 = require("@heronjs/common");
const eav_errors_1 = require("./eav.errors");
class ValueDoesNotMatchOptionError extends common_1.RuntimeError {
    constructor(message) {
        super(eav_errors_1.ErrorNamespaces.EAV, eav_errors_1.ErrorCodes.VALUE_DOES_NOT_MATCH_OPTION, message !== null && message !== void 0 ? message : 'EAV does not match option');
    }
}
exports.ValueDoesNotMatchOptionError = ValueDoesNotMatchOptionError;
