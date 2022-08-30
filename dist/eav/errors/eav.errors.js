"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.ErrorNamespaces = void 0;
var ErrorNamespaces;
(function (ErrorNamespaces) {
    ErrorNamespaces["EAV"] = "EAV";
})(ErrorNamespaces = exports.ErrorNamespaces || (exports.ErrorNamespaces = {}));
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["CANNOT_CREATE_FOR_DISABLED_ATTRIBUTE"] = 10000] = "CANNOT_CREATE_FOR_DISABLED_ATTRIBUTE";
    ErrorCodes[ErrorCodes["TYPE_OF_VALUE_MUST_BE_A_NUMBER"] = 10001] = "TYPE_OF_VALUE_MUST_BE_A_NUMBER";
    ErrorCodes[ErrorCodes["TYPE_OF_VALUE_MUST_BE_A_STRING"] = 10002] = "TYPE_OF_VALUE_MUST_BE_A_STRING";
    ErrorCodes[ErrorCodes["TYPE_OF_VALUE_MUST_BE_A_BOOLEAN"] = 10003] = "TYPE_OF_VALUE_MUST_BE_A_BOOLEAN";
    ErrorCodes[ErrorCodes["TYPE_OF_VALUE_MUST_BE_A_DATETIME"] = 10004] = "TYPE_OF_VALUE_MUST_BE_A_DATETIME";
    ErrorCodes[ErrorCodes["TYPE_OF_VALUE_MUST_BE_A_ARRAY"] = 10005] = "TYPE_OF_VALUE_MUST_BE_A_ARRAY";
    ErrorCodes[ErrorCodes["TYPE_OF_VALUE_MUST_BE_A_OBJECT"] = 10006] = "TYPE_OF_VALUE_MUST_BE_A_OBJECT";
    ErrorCodes[ErrorCodes["NOT_SUPPORT_THIS_TYPE"] = 10007] = "NOT_SUPPORT_THIS_TYPE";
    ErrorCodes[ErrorCodes["ENTITY_NOT_FOUND"] = 10008] = "ENTITY_NOT_FOUND";
    ErrorCodes[ErrorCodes["ATTRIBUTE_NOT_FOUND"] = 10009] = "ATTRIBUTE_NOT_FOUND";
    ErrorCodes[ErrorCodes["ATTRIBUTE_VALUE_NOT_FOUND"] = 10010] = "ATTRIBUTE_VALUE_NOT_FOUND";
    ErrorCodes[ErrorCodes["ATTRIBUTE_VALUE_DOES_NOT_ALLOW_UPDATE"] = 10011] = "ATTRIBUTE_VALUE_DOES_NOT_ALLOW_UPDATE";
    ErrorCodes[ErrorCodes["SYSTEM_DEFINED_ATTRIBUTE_CANNOT_BE_DELETED"] = 10012] = "SYSTEM_DEFINED_ATTRIBUTE_CANNOT_BE_DELETED";
    ErrorCodes[ErrorCodes["SYSTEM_DEFINED_ATTRIBUTE_VALUE_CANNOT_BE_DELETED"] = 10013] = "SYSTEM_DEFINED_ATTRIBUTE_VALUE_CANNOT_BE_DELETED";
    ErrorCodes[ErrorCodes["ATTRIBUTE_IS_REQUIRED"] = 10014] = "ATTRIBUTE_IS_REQUIRED";
    ErrorCodes[ErrorCodes["CODE_ALREADY_EXIST"] = 10015] = "CODE_ALREADY_EXIST";
    ErrorCodes[ErrorCodes["VALUE_DOES_NOT_MATCH_OPTION"] = 10016] = "VALUE_DOES_NOT_MATCH_OPTION";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
