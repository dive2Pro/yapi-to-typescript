"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const json_schema_generator_1 = tslib_1.__importDefault(require("json-schema-generator"));
const json5_1 = tslib_1.__importDefault(require("json5"));
const types_1 = require("./types");
const propDefinitionsToJsonSchema_1 = tslib_1.__importDefault(require("./propDefinitionsToJsonSchema"));
const jsonSchemaToTypes_1 = tslib_1.__importDefault(require("./jsonSchemaToTypes"));
/**
 * 生成请求数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @returns typescript 定义
 */
function generateRequestPayloadType(api, interfaceName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let jsonSchema = {};
        switch (api.method) {
            case types_1.Method.GET:
            case types_1.Method.HEAD:
            case types_1.Method.OPTIONS:
                jsonSchema = propDefinitionsToJsonSchema_1.default(api.req_query.map(item => ({
                    name: item.name,
                    required: item.required === types_1.Required.True,
                    type: 'string',
                    comment: item.desc,
                })));
                break;
            default:
                switch (api.req_body_type) {
                    case types_1.RequestBodyType.Form:
                        jsonSchema = propDefinitionsToJsonSchema_1.default(api.req_body_form.map(item => ({
                            name: item.name,
                            required: item.required === types_1.Required.True,
                            type: (item.type === types_1.RequestFormItemType.File ? 'file' : 'string'),
                            comment: item.desc,
                        })));
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
        return jsonSchemaToTypes_1.default(jsonSchema, interfaceName);
    });
}
exports.default = generateRequestPayloadType;
