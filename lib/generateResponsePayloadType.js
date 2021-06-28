"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var json5_1 = tslib_1.__importDefault(require("json5"));
var types_1 = require("./types");
var mockjsJsonToJsonSchema_1 = tslib_1.__importDefault(require("./mockjsJsonToJsonSchema"));
var jsonSchemaToTypes_1 = tslib_1.__importDefault(require("./jsonSchemaToTypes"));
/**
 * 生成返回数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @param [dataKey] 数据所在字段，不设置表示整体都是数据
 * @returns typescript 定义
 */
function generateResponsePayloadType(api, interfaceName, dataKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var jsonSchema;
        return tslib_1.__generator(this, function (_a) {
            jsonSchema = {};
            switch (api.res_body_type) {
                case types_1.ResponseBodyType.Json:
                case types_1.ResponseBodyType.JsonSchema:
                    if (api.res_body) {
                        jsonSchema = api.res_body_is_json_schema
                            ? JSON.parse(api.res_body)
                            : mockjsJsonToJsonSchema_1.default(json5_1.default.parse(api.res_body));
                    }
                    break;
                default:
                    break;
            }
            if (dataKey && jsonSchema && jsonSchema.properties && jsonSchema.properties[dataKey]) {
                jsonSchema = jsonSchema.properties[dataKey];
            }
            return [2 /*return*/, jsonSchemaToTypes_1.default(jsonSchema, interfaceName)];
        });
    });
}
exports.default = generateResponsePayloadType;
