"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.columnMetadataKey = exports.tablePrimaryKeyColumnNameMetadataKey = exports.tablePrimaryKeyMetadataKey = void 0;
const common_1 = require("../../../common");
exports.tablePrimaryKeyMetadataKey = Symbol.for('table:primaryKey');
exports.tablePrimaryKeyColumnNameMetadataKey = Symbol.for('table:primaryKeyColumnName');
exports.columnMetadataKey = Symbol.for('table:column');
function Column(options = {}) {
    return (target, propertyKey) => {
        if (!options.name)
            options.name = common_1.StringFormatter.camelToSnakeCase(propertyKey.toString());
        Reflect.defineMetadata(exports.columnMetadataKey, options, target, propertyKey);
        if (options.isPrimaryKey) {
            Reflect.defineMetadata(exports.tablePrimaryKeyMetadataKey, propertyKey, target);
            Reflect.defineMetadata(exports.tablePrimaryKeyColumnNameMetadataKey, options.name, target);
        }
    };
}
exports.Column = Column;
