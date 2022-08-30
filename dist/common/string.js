"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFormatter = void 0;
class StringFormatter {
    static camelToSnakeCase(str) {
        return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    }
}
exports.StringFormatter = StringFormatter;
