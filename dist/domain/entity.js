"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(id, props) {
        if (id === undefined || props === undefined) {
            this._props = {};
            return;
        }
        this._id = id;
        this._props = props;
    }
    get id() {
        return this._id;
    }
    get props() {
        return this._props;
    }
    setId(payload) {
        if (payload !== undefined)
            this._id = payload;
    }
    equals(entity) {
        if (entity.id === undefined || entity.id === null)
            return false;
        if (!(entity instanceof this.constructor))
            return false;
        return entity.id === this.id;
    }
}
exports.Entity = Entity;
