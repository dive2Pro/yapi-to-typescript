import { JSONSchema4 } from 'json-schema';
import { PropDefinitions } from './types';
/**
 * 将属性定义转换为 json-schema。
 *
 * @param propDefinitions 要转换的属性定义列表
 * @returns 符合 JSONSchema4 格式的对象
 */
export default function propDefinitionsToJsonSchema(propDefinitions: PropDefinitions): JSONSchema4;
