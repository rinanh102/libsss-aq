"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        this._props = props;
    }
    get props() {
        return this._props;
    }
}
exports.ValueObject = ValueObject;
