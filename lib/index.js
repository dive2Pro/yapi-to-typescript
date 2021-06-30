"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var changeCase = tslib_1.__importStar(require("change-case"));
var consola_1 = tslib_1.__importDefault(require("consola"));
var throwError_1 = tslib_1.__importDefault(require("./throwError"));
var types_1 = require("./types");
var fetchApiCollection_1 = tslib_1.__importDefault(require("./fetchApiCollection"));
var generateRequestPayloadType_1 = tslib_1.__importDefault(require("./generateRequestPayloadType"));
var generateResponsePayloadType_1 = tslib_1.__importDefault(require("./generateResponsePayloadType"));
var request_1 = require("./request");
exports.default = (function (config) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var loginUrl, request, loginResult;
    var _this = this;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                consola_1.default.info("获取接口 JSON 文件中...");
                loginUrl = config.url + "api/user/" + (config.login.method === "ldap" ? "login_by_ldap" : "login");
                request = request_1.initRequest(config);
                return [4 /*yield*/, request.post(loginUrl, {
                        form: {
                            email: config.login.email,
                            password: config.login.password
                        }
                    })];
            case 1:
                loginResult = _a.sent();
                if (!loginResult || loginResult.errcode !== 0) {
                    return [2 /*return*/, throwError_1.default("\u767B\u5F55 " + loginUrl + " \u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u90AE\u7BB1\u3001\u5BC6\u7801\u662F\u5426\u6709\u8BEF\u6216\u670D\u52A1\u662F\u5426\u53EF\u7528\u3002", "\uFF08\u670D\u52A1\u5668\u9519\u8BEF\u4FE1\u606F\uFF1A" + loginResult.errmsg + "\uFF09")];
                }
                config.project.forEach(function (projectConfig) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var apiCollection, categoryIdToApiList, tsContent, categories_1, targetFile, requestFile;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetchApiCollection_1.default(projectConfig, request)];
                            case 1:
                                apiCollection = _a.sent();
                                consola_1.default.info("生成 TypeScript 类型文件中...");
                                categoryIdToApiList = apiCollection.reduce(function (res, api) {
                                    if (api && api.list && api.list.length) {
                                        res[api.list[0].catid] = api.list;
                                    }
                                    return res;
                                }, {});
                                tsContent = "";
                                if (!(projectConfig.categories === "all")) return [3 /*break*/, 2];
                                return [3 /*break*/, 4];
                            case 2:
                                categories_1 = projectConfig.categories;
                                return [4 /*yield*/, Promise.all(Object.keys(categories_1).map(function (categoryId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var _a, getRequestFunctionName, getInterfaceName;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_b) {
                                            _a = categories_1[categoryId], getRequestFunctionName = _a.getRequestFunctionName, getInterfaceName = _a.getInterfaceName;
                                            return [2 /*return*/, Promise.all((categoryIdToApiList[categoryId] || []).map(function (api) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    var extendedApi, requestDataInterfaceName, responseDataInterfaceName, requestPayloadType, responsePayloadType;
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                extendedApi = tslib_1.__assign({}, api, { parsedPath: path_1.default.parse(api.path), changeCase: changeCase });
                                                                requestDataInterfaceName = changeCase.pascalCase(getInterfaceName(extendedApi, types_1.InterfaceType.Request));
                                                                responseDataInterfaceName = changeCase.pascalCase(getInterfaceName(extendedApi, types_1.InterfaceType.Response));
                                                                return [4 /*yield*/, generateRequestPayloadType_1.default(api, requestDataInterfaceName)];
                                                            case 1:
                                                                requestPayloadType = (_a.sent()).trim();
                                                                return [4 /*yield*/, generateResponsePayloadType_1.default(api, responseDataInterfaceName, projectConfig.dataKey)];
                                                            case 2:
                                                                responsePayloadType = (_a.sent()).trim();
                                                                return [2 /*return*/, [
                                                                        "/**\n * **\u8BF7\u6C42\u7C7B\u578B**\uFF1A" + api.title + "\n */\n" + requestPayloadType,
                                                                        "/**\n * **\u54CD\u5E94\u7C7B\u578B**\uFF1A" + api.title + "\n */\n" + responsePayloadType,
                                                                        "/**\n * " + api.title + "\n */\nexport function " + getRequestFunctionName(extendedApi) + "(requestData" + (/(\{\}|any)$/s.test(requestPayloadType) ? "?" : "") + ": Options<" + requestDataInterfaceName + ">): Promise<" + responseDataInterfaceName + "> {\n" + [
                                                                            // `  const { data, fileData } = parseRequestData(requestData)`,
                                                                            "  return request({",
                                                                            "    path: " + projectConfig.path + " + '/" + api.path + "',",
                                                                            "    method: '" + api.method + "',",
                                                                            "    requestBodyType: '" + (api.method === types_1.Method.GET
                                                                                ? types_1.RequestBodyType.Query
                                                                                : api.req_body_type) + "',",
                                                                            "    responseBodyType: '" + api.res_body_type + "',",
                                                                            "    ...requestData",
                                                                            "  } as any, option)"
                                                                        ].join("\n") + "\n}"
                                                                    ].join("\n\n")];
                                                        }
                                                    });
                                                }); }))];
                                        });
                                    }); }))];
                            case 3:
                                tsContent = (_a.sent())
                                    .reduce(function (res, arr) {
                                    res.push.apply(res, arr);
                                    return res;
                                }, [])
                                    .join("\n\n");
                                _a.label = 4;
                            case 4:
                                targetFile = path_1.default.resolve(process.cwd(), projectConfig.targetFile);
                                requestFile = path_1.default.join(path_1.default.parse(targetFile).dir, "request.ts");
                                if (!fs_extra_1.default.existsSync(requestFile)) {
                                    fs_extra_1.default.outputFileSync(requestFile, "\n      import { RequestPayload } from 'yapi-to-typescript/lib/types'\n\n      export default function request({\n        path,\n        method,\n        requestBodyType,\n        responseBodyType,\n        data,\n        fileData\n      }: RequestPayload, option?: Options): Promise<any> {\n        return new Promise((resolve, reject) => {\n          // \u662F\u5426\u542B\u6709\u6587\u4EF6\u6570\u636E\n          const hasFileData = Object.keys(fileData).length > 0\n\n          // \u5728\u8FD9\u91CC\u5B9E\u73B0\u8BF7\u6C42\u903B\u8F91\n        })\n      }\n    "
                                        .trim()
                                        .replace(/ {6}/g, "") + "\n");
                                }
                                fs_extra_1.default.outputFileSync(targetFile, [
                                    "/* tslint:disable */\n/* eslint-disable */",
                                    "import request from './request'",
                                    "// @ts-ignore\nimport { FileData, parseRequestData } from 'yapi-to-typescript/lib/utils'",
                                    tsContent
                                ].join("\n\n"));
                                consola_1.default.success("\u64CD\u4F5C\u5B8C\u6210.");
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
