"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relation = exports.relationMetadataKey = void 0;
const __1 = require("..");
const common_1 = require("../../../common");
exports.relationMetadataKey = Symbol.for('table:relation');
function Relation(options) {
    return (target, propertyKey) => {
        if (options) {
            if (!options.name)
                options.name = common_1.StringFormatter.camelToSnakeCase(propertyKey.toString());
            if (!options.localId) {
                options.localId = 'id';
            }
            if (!options.refId) {
                options.refId = 'id';
            }
            if (!options.relationship) {
                options.relationship = __1.TableRelationships.ONE_TO_ONE;
            }
        }
        Reflect.defineMetadata(exports.relationMetadataKey, options, target, propertyKey);
    };
}
exports.Relation = Relation;
