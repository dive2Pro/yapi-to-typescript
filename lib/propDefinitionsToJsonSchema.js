"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * 将属性定义转换为 json-schema。
 *
 * @param propDefinitions 要转换的属性定义列表
 * @returns 符合 JSONSchema4 格式的对象
 */
function propDefinitionsToJsonSchema(propDefinitions) {
    return {
        type: 'object',
        required: propDefinitions.reduce(function (res, prop) {
            if (prop.required) {
                res.push(prop.name);
            }
            return res;
        }, []),
        properties: propDefinitions.reduce(function (res, prop) {
            res[prop.name] = tslib_1.__assign({ type: prop.type, description: prop.comment }, (prop.type === 'file' ? { tsType: 'FileData' } : {}));
            return res;
        }, {}),
    };
}
exports.default = propDefinitionsToJsonSchema;
