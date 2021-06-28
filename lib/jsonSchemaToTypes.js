"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var vtils_1 = require("vtils");
var JSTTOptions = {
    bannerComment: '',
    style: {
        bracketSpacing: false,
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false,
    },
};
/**
 * 1. 去除 title 和 id，防止 JSTT 自作主张提取它们作为接口名
 * 2. 将 additionalProperties 设为 false
 */
var normalizeSchema = function (schema) {
    if (vtils_1.isEmpty(schema))
        return schema;
    delete schema.title;
    delete schema.id;
    schema.additionalProperties = false;
    if (schema.properties) {
        Object.values(schema.properties).forEach(function (item) {
            normalizeSchema(item);
        });
    }
    if (schema.items) {
        vtils_1.castArray(schema.items).forEach(function (item) {
            normalizeSchema(item);
        });
    }
    return schema;
};
function jsonSchemaToTypes(schema, interfaceName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if (vtils_1.isEmpty(schema)) {
                return [2 /*return*/, "export type " + interfaceName + " = any"];
            }
            return [2 /*return*/, json_schema_to_typescript_1.compile(normalizeSchema(schema), interfaceName, JSTTOptions)];
        });
    });
}
exports.default = jsonSchemaToTypes;
