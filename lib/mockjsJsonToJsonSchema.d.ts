import { JSONSchema4 } from 'json-schema';
/**
 * 将 mockjs 格式的 json 对象转换为 json-schema。
 *
 * @param obj 要转换的对象
 * @returns 符合 JSONSchema4 格式的对象
 */
export default function mockjsJsonToJsonSchema(obj: object): JSONSchema4;
