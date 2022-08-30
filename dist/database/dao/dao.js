"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDao = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@heronjs/common");
const inversify_1 = require("inversify");
let BaseDao = class BaseDao {
    constructor(payload) {
        const { tableName, db, queryUtil } = payload;
        const client = db.database();
        if (!client)
            throw new common_1.SQLError(common_1.SQLErrors.CONNECTION_ERR, 'Database client is undefined');
        this._tableName = tableName;
        this._client = client;
        this._queryUtil = queryUtil;
    }
    transaction(exec) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._queryUtil.transaction((trx) => exec(trx));
        });
    }
    create(dto, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this._queryUtil.create(this._tableName, dto, options);
                return dto;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    createList(dtos, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (dtos.length)
                    yield this._queryUtil.createList(this._tableName, dtos, options);
                return dtos;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    updateById(id, dto, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this._queryUtil.updateById(this._tableName, id, dto, options);
                return dto;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    updateList(dtos, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (dtos.length)
                    yield this._queryUtil.updateList(this._tableName, dtos, options);
                return dtos;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    deleteById(id, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this._queryUtil.deleteById(this._tableName, id, options);
                return id;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    deleteList(ids, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (ids.length)
                    yield this._queryUtil.deleteList(this._tableName, ids, options);
                return ids;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    find(payload = {}, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this._queryUtil.findAndTransform(this._tableName, payload, options);
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    findOne(payload = {}, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const newPayload = payload;
                newPayload.offset = 0;
                newPayload.limit = 1;
                const results = yield this.find(newPayload, options);
                return results[0] ? results[0] : undefined;
            }
            catch (err) {
                throw this._transformError(err);
            }
        });
    }
    _transformError(err) {
        const logger = new common_1.Logger(this.constructor.name);
        logger.error(err);
        return err;
    }
};
BaseDao = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], BaseDao);
exports.BaseDao = BaseDao;
