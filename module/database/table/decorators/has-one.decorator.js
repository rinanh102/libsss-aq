"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasOne = void 0;
const __1 = require("..");
const common_1 = require("../../../common");
function HasOne(tableName, localId, refId) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(__1.relationMetadataKey, {
            name: common_1.StringFormatter.camelToSnakeCase(propertyKey.toString()),
            tableName,
            localId,
            refId,
            relationship: __1.TableRelationships.ONE_TO_ONE,
        }, target, propertyKey);
    };
}
exports.HasOne = HasOne;
