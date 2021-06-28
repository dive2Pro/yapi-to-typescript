"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));
var cookie_1 = tslib_1.__importDefault(require("cookie"));
var vtils_1 = require("vtils");
var throwError_1 = tslib_1.__importDefault(require("./throwError"));
function fetchApiCollection(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var matches, baseUrl, projectId, cookieJar, cookies, request, apiCollection, token_1, catListUrl, catListResult, catIds_1, loginUrl, apiUrl, loginResult;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    matches = config.projectUrl.match(/(.+\/)project\/(\d+)\//);
                    if (!matches) {
                        return [2 /*return*/, throwError_1.default('无法解析 projectUrl，请检查是否有误。')];
                    }
                    baseUrl = matches[1], projectId = matches[2];
                    cookieJar = request_promise_native_1.default.jar();
                    if (config.extraCookies) {
                        cookies = cookie_1.default.parse(config.extraCookies);
                        vtils_1.forOwn(cookies, function (cookie, key) {
                            cookieJar.setCookie(key + "=" + cookie, baseUrl);
                        });
                    }
                    request = request_promise_native_1.default.defaults({
                        jar: cookieJar,
                        json: true,
                    });
                    if (!(config.login.method === 'openapi')) return [3 /*break*/, 3];
                    token_1 = config.login.token;
                    catListUrl = baseUrl + "api/interface/list_menu?token=" + token_1;
                    return [4 /*yield*/, request.get(catListUrl)];
                case 1:
                    catListResult = _a.sent();
                    if (!catListResult || catListResult.errcode !== 0) {
                        return [2 /*return*/, throwError_1.default('openapi 请求失败，请确认 YApi 的版本是否大于或等于 1.5.0，以及 token 是否正确。', "\uFF08\u670D\u52A1\u5668\u9519\u8BEF\u4FE1\u606F\uFF1A" + catListResult.errmsg + "\uFF09")];
                    }
                    catIds_1 = Object.keys(config.categories).map(Number);
                    return [4 /*yield*/, Promise.all(catListResult.data
                            .filter(function (cat) { return cat.list.length && catIds_1.includes(cat.list[0].catid); })
                            .map(function (cat) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = cat;
                                        return [4 /*yield*/, Promise.all(cat.list.map(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var apiDetailUrl, apiDetailResult;
                                                return tslib_1.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            apiDetailUrl = baseUrl + "api/interface/get?id=" + item._id + "&token=" + token_1;
                                                            return [4 /*yield*/, request.get(apiDetailUrl)];
                                                        case 1:
                                                            apiDetailResult = _a.sent();
                                                            return [2 /*return*/, apiDetailResult.data];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _a.list = _b.sent();
                                        return [2 /*return*/, cat];
                                }
                            });
                        }); }))];
                case 2:
                    apiCollection = _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    loginUrl = baseUrl + "api/user/" + (config.login.method === 'ldap' ? 'login_by_ldap' : 'login');
                    apiUrl = baseUrl + "api/plugin/export?type=json&pid=" + projectId + "&status=all&isWiki=false";
                    return [4 /*yield*/, request.post(loginUrl, {
                            form: {
                                email: config.login.email,
                                password: config.login.password,
                            },
                        })];
                case 4:
                    loginResult = _a.sent();
                    if (!loginResult || loginResult.errcode !== 0) {
                        return [2 /*return*/, throwError_1.default("\u767B\u5F55 " + loginUrl + " \u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u90AE\u7BB1\u3001\u5BC6\u7801\u662F\u5426\u6709\u8BEF\u6216\u670D\u52A1\u662F\u5426\u53EF\u7528\u3002", "\uFF08\u670D\u52A1\u5668\u9519\u8BEF\u4FE1\u606F\uFF1A" + loginResult.errmsg + "\uFF09")];
                    }
                    return [4 /*yield*/, request.get(apiUrl)];
                case 5:
                    apiCollection = _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, apiCollection];
            }
        });
    });
}
exports.default = fetchApiCollection;
