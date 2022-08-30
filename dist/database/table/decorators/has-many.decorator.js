"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasMany = void 0;
const __1 = require("..");
const common_1 = require("../../../common");
function HasMany(tableName, localId, refId) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(__1.relationMetadataKey, {
            name: common_1.StringFormatter.camelToSnakeCase(propertyKey.toString()),
            tableName,
            localId,
            refId,
            relationship: __1.TableRelationships.ONE_TO_MANY,
        }, target, propertyKey);
    };
}
exports.HasMany = HasMany;
