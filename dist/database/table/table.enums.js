"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRelationships = exports.QueryTypes = void 0;
var QueryTypes;
(function (QueryTypes) {
    QueryTypes[QueryTypes["EQUAL"] = 0] = "EQUAL";
    QueryTypes[QueryTypes["NOT_EQUAL"] = 1] = "NOT_EQUAL";
    QueryTypes[QueryTypes["GREATER_THAN"] = 2] = "GREATER_THAN";
    QueryTypes[QueryTypes["LESS_THAN"] = 3] = "LESS_THAN";
    QueryTypes[QueryTypes["GREATER_THAN_OR_EQUAL"] = 4] = "GREATER_THAN_OR_EQUAL";
    QueryTypes[QueryTypes["LESS_THAN_OR_EQUAL"] = 5] = "LESS_THAN_OR_EQUAL";
    QueryTypes[QueryTypes["IN"] = 6] = "IN";
    QueryTypes[QueryTypes["NOT_IN"] = 7] = "NOT_IN";
})(QueryTypes = exports.QueryTypes || (exports.QueryTypes = {}));
var TableRelationships;
(function (TableRelationships) {
    TableRelationships[TableRelationships["ONE_TO_ONE"] = 0] = "ONE_TO_ONE";
    TableRelationships[TableRelationships["ONE_TO_MANY"] = 1] = "ONE_TO_MANY";
    TableRelationships[TableRelationships["MANY_TO_ONE"] = 2] = "MANY_TO_ONE";
    TableRelationships[TableRelationships["MANY_TO_MANY"] = 3] = "MANY_TO_MANY";
})(TableRelationships = exports.TableRelationships || (exports.TableRelationships = {}));
