"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eav = exports.EavTableTypes = exports.eavValueMetadataKey = exports.eavAttributeMetadataKey = exports.eavEntityMetadataKey = void 0;
exports.eavEntityMetadataKey = Symbol.for('table:eavEntity');
exports.eavAttributeMetadataKey = Symbol.for('table:eavAttribute');
exports.eavValueMetadataKey = Symbol.for('table:eavValue');
var EavTableTypes;
(function (EavTableTypes) {
    EavTableTypes[EavTableTypes["ENTITY"] = 0] = "ENTITY";
    EavTableTypes[EavTableTypes["ATTRIBUTE"] = 1] = "ATTRIBUTE";
    EavTableTypes[EavTableTypes["VALUE"] = 2] = "VALUE";
})(EavTableTypes = exports.EavTableTypes || (exports.EavTableTypes = {}));
function Eav(options) {
    return (target, propertyKey) => {
        switch (options.type) {
            case EavTableTypes.ENTITY:
                Reflect.defineMetadata(exports.eavEntityMetadataKey, propertyKey, target);
                break;
            case EavTableTypes.ATTRIBUTE:
                Reflect.defineMetadata(exports.eavAttributeMetadataKey, propertyKey, target);
                break;
            case EavTableTypes.VALUE:
                Reflect.defineMetadata(exports.eavValueMetadataKey, propertyKey, target);
                break;
            default:
                break;
        }
    };
}
exports.Eav = Eav;
