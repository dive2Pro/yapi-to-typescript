import { Api } from './types';
/**
 * 生成请求数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @returns typescript 定义
 */
export default function generateRequestPayloadType(api: Api, interfaceName: string): Promise<string>;
