"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const changeCase = tslib_1.__importStar(require("change-case"));
const consola_1 = tslib_1.__importDefault(require("consola"));
const throwError_1 = tslib_1.__importDefault(require("./throwError"));
const types_1 = require("./types");
const fetchApiCollection_1 = tslib_1.__importDefault(require("./fetchApiCollection"));
const generateRequestPayloadType_1 = tslib_1.__importDefault(require("./generateRequestPayloadType"));
const generateResponsePayloadType_1 = tslib_1.__importDefault(require("./generateResponsePayloadType"));
const request_1 = require("./request");
exports.default = (config) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    consola_1.default.info("获取接口 JSON 文件中...");
    const loginUrl = `${config.url}api/user/${config.login.method === "ldap" ? "login_by_ldap" : "login"}`;
    const request = request_1.initRequest(config);
    const loginResult = yield request.post(loginUrl, {
        form: {
            email: config.login.email,
            password: config.login.password
        }
    });
    if (!loginResult || loginResult.errcode !== 0) {
        return throwError_1.default(`登录 ${loginUrl} 失败，请检查邮箱、密码是否有误或服务是否可用。`, `（服务器错误信息：${loginResult.errmsg}）`);
    }
    config.project.forEach((projectConfig) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const apiCollection = yield fetchApiCollection_1.default(projectConfig, request);
        consola_1.default.info("生成 TypeScript 类型文件中...");
        const categoryIdToApiList = apiCollection.reduce((res, api) => {
            if (api && api.list && api.list.length) {
                res[api.list[0].catid] = api.list;
            }
            return res;
        }, {});
        let tsContent = "";
        let categories = [];
        if (projectConfig.categories === "all") {
            categories = apiCollection.map(apiItem => apiItem.index);
        }
        else {
            categories = projectConfig.categories;
        }
        tsContent = (yield Promise.all(Object.keys(categories).map((categoryId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Promise.all((categoryIdToApiList[categoryId] || []).map((api) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const extendedApi = Object.assign({}, api, { parsedPath: path_1.default.parse(api.path), changeCase: changeCase });
                const requestDataInterfaceName = changeCase.pascalCase(projectConfig.getInterfaceName(extendedApi, types_1.InterfaceType.Request));
                const responseDataInterfaceName = changeCase.pascalCase(projectConfig.getInterfaceName(extendedApi, types_1.InterfaceType.Response));
                const requestPayloadType = (yield generateRequestPayloadType_1.default(api, requestDataInterfaceName)).trim();
                const responsePayloadType = (yield generateResponsePayloadType_1.default(api, responseDataInterfaceName, projectConfig.dataKey)).trim();
                return [
                    `/**\n * **请求类型**：${api.title}\n */\n${requestPayloadType}`,
                    `/**\n * **响应类型**：${api.title}\n */\n${responsePayloadType}`,
                    `/**\n * ${api.title}\n */\nexport function ${projectConfig.getRequestFunctionName(extendedApi)}(requestData${/(\{\}|any)$/s.test(requestPayloadType) ? "?" : ""}: Options<${requestDataInterfaceName}>): Promise<${responseDataInterfaceName}> {\n${[
                        // `  const { data, fileData } = parseRequestData(requestData)`,
                        `  return request({`,
                        `    path: ${projectConfig.path} + '${api.path}',`,
                        `    method: '${api.method}',`,
                        `    requestBodyType: '${api.method === types_1.Method.GET
                            ? types_1.RequestBodyType.Query
                            : api.req_body_type}',`,
                        `    responseBodyType: '${api.res_body_type}',`,
                        `    ...requestData`,
                        `  } as any)`
                    ].join("\n")}\n}`
                ].join("\n\n");
            })));
        }))))
            .reduce((res, arr) => {
            res.push(...arr);
            return res;
        }, [])
            .join("\n\n");
        const targetFile = path_1.default.resolve(process.cwd(), projectConfig.targetFile);
        const requestFile = path_1.default.join(path_1.default.parse(targetFile).dir, "request.ts");
        if (!fs_extra_1.default.existsSync(requestFile)) {
            fs_extra_1.default.outputFileSync(requestFile, `${`
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
                .replace(/ {6}/g, "")}\n`);
        }
        fs_extra_1.default.outputFileSync(targetFile, [
            `/* tslint:disable */\n/* eslint-disable */`,
            `import request from './request'`,
            tsContent
        ].join("\n\n"));
        consola_1.default.success(`操作完成.`);
    }));
});
