"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleConnector = exports.RestfulService = exports.ModuleConnectionTypes = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@heronjs/common");
var ModuleConnectionTypes;
(function (ModuleConnectionTypes) {
    ModuleConnectionTypes["INJECTION"] = "INJECTION";
    ModuleConnectionTypes["RESTFUL"] = "RESTFUL";
})(ModuleConnectionTypes = exports.ModuleConnectionTypes || (exports.ModuleConnectionTypes = {}));
const HEADER_KEY_INTERNAL_API_KEY = 'internal-api-key';
class RestfulService {
    constructor(payload) {
        const { host, secretKey, moduleName } = payload;
        if (!host)
            throw new Error(`Restful connector host is not defined, please define environment variable ${moduleName}_MODULE_HOST.`);
        if (!secretKey)
            throw new Error(`Restful connector secretKey is not defined, please define environment variable SECRET_KEY_INTERNAL_API_${moduleName}.`);
        this._host = host;
        this._secretKey = secretKey;
    }
    get host() {
        return this._host;
    }
    get secretKey() {
        return this._secretKey;
    }
    buildUrl(payload) {
        const { pathname, id, query } = payload;
        return `${this.host}${pathname}${id ? '/' + id : ''}${query ? '?' + query : ''}`;
    }
    buildConfig(payload) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return Object.assign(Object.assign({}, payload === null || payload === void 0 ? void 0 : payload.requestConfig), { headers: Object.assign(Object.assign({}, ((_b = (_a = payload === null || payload === void 0 ? void 0 : payload.requestConfig) === null || _a === void 0 ? void 0 : _a.headers) !== null && _b !== void 0 ? _b : {})), { authorization: (_f = (_c = payload === null || payload === void 0 ? void 0 : payload.authToken) !== null && _c !== void 0 ? _c : (_e = (_d = payload === null || payload === void 0 ? void 0 : payload.requestConfig) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e.authorization) !== null && _f !== void 0 ? _f : '', [HEADER_KEY_INTERNAL_API_KEY]: this.secretKey
                    ? this.secretKey
                    : ((_g = payload === null || payload === void 0 ? void 0 : payload.requestConfig) === null || _g === void 0 ? void 0 : _g.headers)
                        ? (_h = payload === null || payload === void 0 ? void 0 : payload.requestConfig.headers['internal-api-key']) !== null && _h !== void 0 ? _h : ''
                        : '' }) });
    }
    callAPI(exec) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield exec();
            }
            catch (error) {
                const axiosError = error;
                console.log(`${this.constructor.name} call API error: \n`, (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data);
                const data = (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data;
                if (data) {
                    const arr = (_c = data === null || data === void 0 ? void 0 : data.error) === null || _c === void 0 ? void 0 : _c.split(':');
                    if ((arr === null || arr === void 0 ? void 0 : arr.length) !== 2) {
                        throw error;
                    }
                    else {
                        const [namespace, code] = arr;
                        throw new common_1.RuntimeError(namespace, code, data.message, axiosError);
                    }
                }
                throw error;
            }
        });
    }
}
exports.RestfulService = RestfulService;
class ModuleConnector {
    constructor(payload) {
        const { classInjectionService, classRestfulService, moduleName, type } = payload;
        if (classInjectionService) {
            this._service = new classInjectionService();
        }
        else {
            if (!type)
                throw new Error(`Module connection type is not defined, please define environment variable ${moduleName}_MODULE_CONNECTION_TYPE.`);
            switch (type) {
                case ModuleConnectionTypes.RESTFUL:
                    if (classRestfulService) {
                        this._service = new classRestfulService();
                        break;
                    }
                    throw new Error(`Module connection type ${type} is not implement.`);
                default:
                    throw new Error(`Module connection type ${type} is not support.`);
            }
        }
    }
    get service() {
        return this._service;
    }
}
exports.ModuleConnector = ModuleConnector;
