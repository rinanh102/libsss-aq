"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EavAttributeStatus = exports.EavAttributeTypes = void 0;
var EavAttributeTypes;
(function (EavAttributeTypes) {
    EavAttributeTypes["NUMBER"] = "number";
    EavAttributeTypes["STRING"] = "string";
    EavAttributeTypes["BOOLEAN"] = "boolean";
    EavAttributeTypes["DATETIME"] = "datetime";
    EavAttributeTypes["ARRAY"] = "array";
    EavAttributeTypes["OBJECT"] = "object";
})(EavAttributeTypes = exports.EavAttributeTypes || (exports.EavAttributeTypes = {}));
var EavAttributeStatus;
(function (EavAttributeStatus) {
    EavAttributeStatus["ENABLED"] = "enabled";
    EavAttributeStatus["DISABLED"] = "disabled";
})(EavAttributeStatus = exports.EavAttributeStatus || (exports.EavAttributeStatus = {}));
