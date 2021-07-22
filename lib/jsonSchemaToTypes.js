"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const json_schema_to_typescript_1 = require("json-schema-to-typescript");
const vtils_1 = require("vtils");
const JSTTOptions = {
    bannerComment: "",
    style: {
        bracketSpacing: false,
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "none",
        useTabs: false
    }
};
/**
 * 1. 去除 title 和 id，防止 JSTT 自作主张提取它们作为接口名
 * 2. 将 additionalProperties 设为 false
 */
const normalizeSchema = (schema) => {
    if (vtils_1.isEmpty(schema))
        return schema;
    delete schema.title;
    delete schema.id;
    schema.additionalProperties = false;
    if (schema.properties) {
        Object.values(schema.properties).forEach(item => {
            normalizeSchema(item);
        });
    }
    if (schema.items) {
        schema.required = vtils_1.castArray(schema.items).map(item => item.title);
        vtils_1.castArray(schema.items).forEach(item => {
            normalizeSchema(item);
        });
    }
    return schema;
};
function jsonSchemaToTypes(schema, interfaceName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (vtils_1.isEmpty(schema)) {
            return `export type ${interfaceName} = any`;
        }
        return json_schema_to_typescript_1.compile(normalizeSchema(schema), interfaceName, JSTTOptions);
    });
}
exports.default = jsonSchemaToTypes;
