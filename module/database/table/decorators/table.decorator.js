"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.tableEavMetadataKey = exports.tableNameMetadataKey = void 0;
exports.tableNameMetadataKey = Symbol.for('table:name');
exports.tableEavMetadataKey = Symbol.for('table:eav');
function Table(options) {
    const { name, eav } = options;
    return (target) => {
        Reflect.defineMetadata(exports.tableNameMetadataKey, (name || target.name.toLowerCase()).toString(), target.prototype);
        Reflect.defineMetadata(exports.tableEavMetadataKey, eav, target.prototype);
    };
}
exports.Table = Table;
