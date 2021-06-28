import { Api } from './types';
/**
 * 生成返回数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @param [dataKey] 数据所在字段，不设置表示整体都是数据
 * @returns typescript 定义
 */
export default function generateResponsePayloadType(api: Api, interfaceName: string, dataKey?: string): Promise<string>;
