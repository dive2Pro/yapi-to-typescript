"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cookie_1 = tslib_1.__importDefault(require("cookie"));
var vtils_1 = require("vtils");
var request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));
function initRequest(config) {
    var cookieJar = request_promise_native_1.default.jar();
    if (config.extraCookies) {
        var cookies = cookie_1.default.parse(config.extraCookies);
        vtils_1.forOwn(cookies, function (cookie, key) {
            cookieJar.setCookie(key + "=" + cookie, config.url);
        });
    }
    var request = request_promise_native_1.default.defaults({
        jar: cookieJar,
        json: true
    });
    return request;
}
exports.initRequest = initRequest;
