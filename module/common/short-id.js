"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortIdUtil = void 0;
const tslib_1 = require("tslib");
const short_unique_id_1 = tslib_1.__importDefault(require("short-unique-id"));
class ShortIdUtil {
    static get instance() {
        if (!this._instance) {
            this._instance = new short_unique_id_1.default();
            this._instance.setDictionary('alphanum_upper');
        }
        return this._instance;
    }
}
exports.ShortIdUtil = ShortIdUtil;
