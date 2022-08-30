"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityIdUtil = void 0;
const uuid_1 = require("uuid");
class EntityIdUtil {
    static randomUUID() {
        return (0, uuid_1.v4)();
    }
}
exports.EntityIdUtil = EntityIdUtil;
