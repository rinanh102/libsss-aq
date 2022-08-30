"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
const tslib_1 = require("tslib");
class UseCase {
    constructor() {
        this._methods = [];
    }
    get context() {
        if (!this._context)
            throw new Error('Context empty!');
        return this._context;
    }
    updateContext(key, value) {
        if (!this._context)
            this._context = {};
        this._context[key] = value;
    }
    setMethods(methods) {
        this._methods = methods;
    }
    exec(firstInput, initContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._methods && this._methods.length) {
                if (initContext && typeof initContext === 'object')
                    this._context = Object.assign(Object.assign({}, initContext), { firstInput });
                let data = firstInput;
                for (let i = 0; i < this._methods.length; i++) {
                    const method = this._methods[i];
                    if (typeof method !== 'function')
                        throw new Error('Pipe method is not valid function!');
                    data = yield method(data);
                }
                return data;
            }
            else
                throw new Error('Pipe methods not setted or empty!');
        });
    }
}
exports.UseCase = UseCase;
