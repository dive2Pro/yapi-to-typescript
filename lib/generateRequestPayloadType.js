"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var json_schema_generator_1 = tslib_1.__importDefault(require("json-schema-generator"));
var json5_1 = tslib_1.__importDefault(require("json5"));
var types_1 = require("./types");
var propDefinitionsToJsonSchema_1 = tslib_1.__importDefault(require("./propDefinitionsToJsonSchema"));
var jsonSchemaToTypes_1 = tslib_1.__importDefault(require("./jsonSchemaToTypes"));
/**
 * 生成请求数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @returns typescript 定义
 */
function generateRequestPayloadType(api, interfaceName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var jsonSchema;
        return tslib_1.__generator(this, function (_a) {
            jsonSchema = {};
            switch (api.method) {
                case types_1.Method.GET:
                case types_1.Method.HEAD:
                case types_1.Method.OPTIONS:
                    jsonSchema = propDefinitionsToJsonSchema_1.default(api.req_query.map(function (item) { return ({
                        name: item.name,
                        required: item.required === types_1.Required.True,
                        type: 'string',
                        comment: item.desc,
                    }); }));
                    break;
                default:
                    switch (api.req_body_type) {
                        case types_1.RequestBodyType.Form:
                            jsonSchema = propDefinitionsToJsonSchema_1.default(api.req_body_form.map(function (item) { return ({
                                name: item.name,
                                required: item.required === types_1.Required.True,
                                type: (item.type === types_1.RequestFormItemType.File ? 'file' : 'string'),
                                comment: item.desc,
                            }); }));
                            break;
                        case types_1.RequestBodyType.Json:
                            if (api.req_body_other) {
                                jsonSchema = api.req_body_is_json_schema
                                    ? JSON.parse(api.req_body_other)
                                    : json_schema_generator_1.default(json5_1.default.parse(api.req_body_other));
                            }
                            break;
                        default:
                            break;
                    }
                    break;
            }
            return [2 /*return*/, jsonSchemaToTypes_1.default(jsonSchema, interfaceName)];
        });
    });
}
exports.default = generateRequestPayloadType;
