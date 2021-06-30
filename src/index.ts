import path from "path";
import fs from "fs-extra";
import * as changeCase from "change-case";
import consola from "consola";
import throwError from "./throwError";
import {
  Config,
  ApiList,
  InterfaceType,
  ExtendedApi,
  Method,
  RequestBodyType,
  ApiResult
} from "./types";
import fetchApiCollection from "./fetchApiCollection";
import generateRequestPayloadType from "./generateRequestPayloadType";
import generateResponsePayloadType from "./generateResponsePayloadType";
import { initRequest } from "./request";

export default async (config: Config): Promise<void> => {
  consola.info("获取接口 JSON 文件中...");

  const loginUrl = `${config.url}api/user/${
    config.login.method === "ldap" ? "login_by_ldap" : "login"
  }`;
  const request = initRequest(config);

  const loginResult: ApiResult = await request.post(loginUrl, {
    form: {
      email: config.login.email,
      password: config.login.password
    }
  });

  if (!loginResult || loginResult.errcode !== 0) {
    return throwError(
      `登录 ${loginUrl} 失败，请检查邮箱、密码是否有误或服务是否可用。`,
      `（服务器错误信息：${loginResult.errmsg}）`
    );
  }
  config.project.forEach(async projectConfig => {
    const apiCollection = await fetchApiCollection(projectConfig, request);

    consola.info("生成 TypeScript 类型文件中...");
    const categoryIdToApiList = apiCollection.reduce<{ [id: number]: ApiList }>(
      (res, api) => {
        if (api && api.list && api.list.length) {
          res[api.list[0].catid] = api.list;
        }
        return res;
      },
      {}
    );
    let tsContent = "";
    if (projectConfig.categories === "all") {
    } else {
      const categories = projectConfig.categories;
      tsContent = (await Promise.all(
        Object.keys(categories).map(async (categoryId: any) => {
          const { getRequestFunctionName, getInterfaceName } = categories[
            categoryId
          ];
          return Promise.all(
            (categoryIdToApiList[categoryId] || []).map(async api => {
              const extendedApi: ExtendedApi = {
                ...api,
                parsedPath: path.parse(api.path),
                changeCase: changeCase
              };
              const requestDataInterfaceName = changeCase.pascalCase(
                getInterfaceName(extendedApi, InterfaceType.Request)
              );
              const responseDataInterfaceName = changeCase.pascalCase(
                getInterfaceName(extendedApi, InterfaceType.Response)
              );
              const requestPayloadType = (await generateRequestPayloadType(
                api,
                requestDataInterfaceName
              )).trim();
              const responsePayloadType = (await generateResponsePayloadType(
                api,
                responseDataInterfaceName,
                projectConfig.dataKey
              )).trim();
              return [
                `/**\n * **请求类型**：${
                  api.title
                }\n */\n${requestPayloadType}`,
                `/**\n * **响应类型**：${
                  api.title
                }\n */\n${responsePayloadType}`,
                `/**\n * ${
                  api.title
                }\n */\nexport function ${getRequestFunctionName(
                  extendedApi
                )}(requestData${
                  /(\{\}|any)$/s.test(requestPayloadType) ? "?" : ""
                }: Options<${requestDataInterfaceName}>): Promise<${responseDataInterfaceName}> {\n${[
                  // `  const { data, fileData } = parseRequestData(requestData)`,
                  `  return request({`,
                  `    path: ${projectConfig.path} + '/${api.path}',`,
                  `    method: '${api.method}',`,
                  `    requestBodyType: '${
                    api.method === Method.GET
                      ? RequestBodyType.Query
                      : api.req_body_type
                  }',`,
                  `    responseBodyType: '${api.res_body_type}',`,
                  `    ...requestData`,
                  `  } as any, option)`
                ].join("\n")}\n}`
              ].join("\n\n");
            })
          );
        })
      ))
        .reduce((res, arr) => {
          res.push(...arr);
          return res;
        }, [])
        .join("\n\n");
    }
    const targetFile = path.resolve(process.cwd(), projectConfig.targetFile);
    const requestFile = path.join(path.parse(targetFile).dir, "request.ts");
    if (!fs.existsSync(requestFile)) {
      fs.outputFileSync(
        requestFile,
        `${`
      import { RequestPayload } from 'yapi-to-typescript/lib/types'

      export default function request({
        path,
        method,
        requestBodyType,
        responseBodyType,
        data,
        fileData
      }: RequestPayload, option?: Options): Promise<any> {
        return new Promise((resolve, reject) => {
          // 是否含有文件数据
          const hasFileData = Object.keys(fileData).length > 0

          // 在这里实现请求逻辑
        })
      }
    `
          .trim()
          .replace(/ {6}/g, "")}\n`
      );
    }
    fs.outputFileSync(
      targetFile,
      [
        `/* tslint:disable */\n/* eslint-disable */`,
        `import request from './request'`,
        `// @ts-ignore\nimport { FileData, parseRequestData } from 'yapi-to-typescript/lib/utils'`,
        tsContent
      ].join("\n\n")
    );
    consola.success(`操作完成.`);
  });
};
