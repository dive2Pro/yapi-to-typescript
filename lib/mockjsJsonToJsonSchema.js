"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mockjs_1 = tslib_1.__importDefault(require("mockjs"));
// fix: Mock.toJSONSchema 产生的 properties 为数组，然而 JSONSchema4 的 properties 为对象
const fixProperties = (obj) => {
    if (obj.properties) {
        obj.properties = obj.properties.reduce((res, prop) => {
            res[prop.name] = fixProperties(prop);
            return res;
        }, {});
    }
    if (obj.items) {
        obj.items = obj.items.map((item) => fixProperties(item));
    }
    return obj;
};
/**
 * 将 mockjs 格式的 json 对象转换为 json-schema。
 *
 * @param obj 要转换的对象
 * @returns 符合 JSONSchema4 格式的对象
 */
function mockjsJsonToJsonSchema(obj) {
    return fixProperties(mockjs_1.default.toJSONSchema(obj));
}
exports.default = mockjsJsonToJsonSchema;
