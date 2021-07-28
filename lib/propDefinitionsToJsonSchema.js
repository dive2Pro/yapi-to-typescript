"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 将属性定义转换为 json-schema。
 *
 * @param propDefinitions 要转换的属性定义列表
 * @returns 符合 JSONSchema4 格式的对象
 */
function propDefinitionsToJsonSchema(propDefinitions) {
    return {
        type: 'object',
        required: propDefinitions.reduce((res, prop) => {
            if (prop.required) {
                res.push(prop.name);
            }
            return res;
        }, []),
        properties: propDefinitions.reduce((res, prop) => {
            res[prop.name] = {
                type: prop.type,
                description: prop.comment,
                // 特殊处理 file
                // ...(prop.type === 'file' ? : {}),
            };
            return res;
        }, {}),
    };
}
exports.default = propDefinitionsToJsonSchema;
