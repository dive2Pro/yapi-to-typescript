"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TSNode = tslib_1.__importStar(require("ts-node"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var commander_1 = tslib_1.__importDefault(require("commander"));
var index_1 = tslib_1.__importDefault(require("./index"));
TSNode.register({
    transpileOnly: true,
    compilerOptions: {
        module: 'commonjs',
    },
});
function run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var pkg = require('../package.json');
                    var configFile = process.cwd() + "/ytt.config.ts";
                    commander_1.default
                        .version(pkg.version)
                        .arguments('[cmd]')
                        .action(function (cmd) {
                        switch (cmd) {
                            case 'init':
                                fs_extra_1.default.outputFileSync(configFile, "\n              import { Config, InterfaceType } from 'yapi-to-typescript/lib/types'\n\n              const config: Config = {\n                // \u9879\u76EE\u5168\u90E8\u63A5\u53E3\u9875\u9762\u7684 url\n                projectUrl: 'http://foo.bar/project/20/interface/api',\n                // \u767B\u5F55\u4FE1\u606F\n                login: {\n                  // \u767B\u5F55\u65B9\u5F0F\uFF1Aclassical\uFF08\u666E\u901A\u767B\u5F55\uFF09\u3001ldap\uFF08LDAP\uFF09\n                  method: 'classical',\n                  // \u767B\u5F55\u90AE\u7BB1\n                  email: 'hello@foo.bar',\n                  // \u767B\u5F55\u5BC6\u7801\n                  password: '123456',\n                },\n                /**\n                // openapi \u65B9\u5F0F\u767B\u5F55\uFF0Cyapi \u7248\u672C\u5927\u4E8E\u7B49\u4E8E 1.5.0 \u65F6\u63A8\u8350\u4F7F\u7528\n                login: {\n                  method: 'openapi',\n                  token: '\u9879\u76EE\u7684token, \u8FDB\u5165\u9879\u76EE\u7684\u8BBE\u7F6E-->token\u914D\u7F6E\u83B7\u53D6',\n                },\n                */\n                // \u968F\u8BF7\u6C42\u53D1\u9001\u7684\u5176\u4ED6 Cookie\uFF0C\u4E00\u822C\u60C5\u51B5\u4E0B\u4E0D\u5FC5\u7406\u4F1A\n                // \u5982\uFF1Aa=1; b=2\n                extraCookies: '',\n                // \u751F\u6210\u7684 TypeScript \u6587\u4EF6\u8DEF\u5F84\uFF0C\n                // \u540C\u65F6\uFF0C\u5982\u679C\u540C\u7EA7\u76EE\u5F55\u4E0B\u4E0D\u5B58\u5728 `request.ts` \u6587\u4EF6\uFF0C\n                // \u6267\u884C `ytt` \u65F6\u5219\u4F1A\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2A\u9ED8\u8BA4\u7684 `request.ts` \u6587\u4EF6\n                targetFile: 'src/api/index.ts',\n                // \u82E5\u63A5\u53E3\u8FD4\u56DE\u7684\u662F\u7C7B\u4F3C { code: number, msg: string, data: any } \u8FD9\u79CD\u6570\u636E\uFF0C\n                // \u5F80\u5F80\u6211\u4EEC\u53EA\u9700\u8981 data\uFF0C\u8FD9\u65F6\u6211\u4EEC\u53EF\u8BBE\u7F6E dataKey \u4E3A data\uFF0C\n                // \u5219\u63A5\u53E3\u51FD\u6570\u8FD4\u56DE\u7684\u5C31\u662F data \u7684\u503C\n                dataKey: '',\n                // \u63A5\u53E3\u5206\u7C7B\n                categories: {\n                  // \u952E\u662F\u5206\u7C7B ID\uFF0C\n                  // \u6BD4\u5982\u6709\u63A5\u53E3\u5206\u7C7B\u7684 url \u4E3A\uFF1Ahttp://foo.bar/project/20/interface/api/cat_55\uFF0C\n                  // \u5219\u5176 ID \u4E3A 55\n                  55: {\n                    // \u4E0B\u9762\u7684\u914D\u7F6E\u7ED3\u679C\u793A\u4F8B\uFF1A\n                    // export function getUserInfo(data: GetUserInfoRequest): Promise<GetUserInfoResponse> { ... }\n                    // \u83B7\u53D6\u63A5\u53E3\u540D\u79F0\uFF0C\u8FD9\u91CC\u7684\u63A5\u53E3\u6307 TypeScript \u4E2D\u7684 interface\uFF0C\u975E api \u63A5\u53E3\n                    getInterfaceName({ changeCase, parsedPath }, interfaceType) {\n                      const PascalName = changeCase.pascalCase(parsedPath.name)\n                      return `${PascalName}${interfaceType === InterfaceType.Request ? 'Request' : 'Response'}`\n                    },\n                    // \u83B7\u53D6 api \u63A5\u53E3\u51FD\u6570\u540D\u79F0\n                    getRequestFunctionName({ changeCase, parsedPath }) {\n                      return changeCase.camelCase(parsedPath.name)\n                    },\n                  },\n                },\n              }\n\n              export default config\n            ".trim().replace(/ {14}/g, '') + "\n");
                                resolve();
                                break;
                            default:
                                var config = {};
                                switch (true) {
                                    case fs_extra_1.default.existsSync(configFile):
                                        config = require(configFile).default;
                                        break;
                                    default:
                                        reject(new Error('请先设置 ytt.config.ts 文件。'));
                                        return;
                                }
                                index_1.default(config).then(resolve, reject);
                                break;
                        }
                    })
                        .parse(process.argv);
                })];
        });
    });
}
exports.run = run;
