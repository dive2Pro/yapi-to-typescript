"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_1 = tslib_1.__importDefault(require("cookie"));
const vtils_1 = require("vtils");
const request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));
function initRequest(config) {
    const cookieJar = request_promise_native_1.default.jar();
    if (config.extraCookies) {
        const cookies = cookie_1.default.parse(config.extraCookies);
        vtils_1.forOwn(cookies, (cookie, key) => {
            cookieJar.setCookie(`${key}=${cookie}`, config.url);
        });
    }
    const request = request_promise_native_1.default.defaults({
        jar: cookieJar,
        json: true
    });
    return request;
}
exports.initRequest = initRequest;
